using Entity_Layer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.MessageService
{
    public interface IMessageService
    {
        public Task<Response<Message>> CreateAsync(Message message);
        public Task<Response<IEnumerable<Message>>> GetMessagesAsync(string from, string to); // from, to are userid's.
    }
}
