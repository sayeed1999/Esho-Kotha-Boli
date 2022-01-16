using Entity_Layer;
using Repository_Layer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.MessageService
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork unitOfWork;

        public MessageService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response<Message>> CreateAsync(Message message)
        {
            Response<Message> response = await this.unitOfWork.MessageRepository.AddAsync(message);
            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed.";
            }
            return response;
        }

        public async Task<Response<IEnumerable<Message>>> GetMessagesAsync(string from, string to)
        {
            IEnumerable<Message> messages = await this.unitOfWork.MessageRepository.GetWhereToListAsync(
                        x => (x.UserId == from && x.To == to) || (x.UserId == to && x.To == from),
                        ord => ord.OrderByDescending(x => x.DateCreated),
                        page: 1,
                        count: 10
            );
            Response<IEnumerable<Message>> response = new() { Data = messages };
            return response;
        }
    }
}
