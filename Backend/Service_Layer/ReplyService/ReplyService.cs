using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.UnitOfWork;

namespace Service_Layer.ReplyService
{
    public class ReplyService : IReplyService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReplyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<Reply>> CreateReply(Reply reply)
        {
            Response<Reply> response = new Response<Reply>();

            // check the PostId exists or not.
            Comment comment = await _unitOfWork.CommentRepository.FindAsync(reply.CommentId);
            if (comment is null)
            {
                response.Message = "Comment not found";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else if (String.IsNullOrWhiteSpace(reply.Body))
            {
                response.Message = "Reply body cannot be null or white space";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                response = await _unitOfWork.ReplyRepository.AddAsync(reply);
                try
                {
                    await _unitOfWork.CompleteAsync();
                }
                catch (Exception ex)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "Failed!";
                }
            }
            return response;
        }

        public async Task<Response<Reply>> DeleteReply(long id)
        {
            var response = new Response<Reply>();
            response = await _unitOfWork.ReplyRepository.DeleteAsync(id);
            try
            {
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed!";
            }
            return response;
        }

        public async Task<Response<Reply>> GetReply(long id)
        {
            Response<Reply> response = await _unitOfWork.ReplyRepository.GetByIdAsync(id);
            return response;
        }

        public async Task<Response<IEnumerable<Reply>>> GetRepliesByComment(long commentId)
        {
            var response = new Response<IEnumerable<Reply>>();
            try
            {
                IEnumerable<Reply> replies = await _unitOfWork.ReplyRepository.GetWhereToListAsync(x => x.CommentId == commentId);
                response.Data = replies;
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed!";
            }
            return response;
        }

        public async Task<Response<Reply>> UpdateReply(long id, Reply reply)
        {
            Response<Reply> response = await _unitOfWork.ReplyRepository.UpdateAsync(id, reply);
            try
            {
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed!";
            }
            return response;
        }
    }
}
