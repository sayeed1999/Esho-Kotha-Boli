using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;

namespace Service_Layer.ReplyService
{
    public interface IReplyService
    {
        // Create
        Task<Response<Reply>> CreateReply(Reply Rreply);

        // Read
        Task<Response<IEnumerable<Reply>>> GetRepliesByComment(long commentId);
        Task<Response<Reply>> GetReply(long id);

        // Update
        Task<Response<Reply>> UpdateReply(long id, Reply reply);

        // Delete
        Task<Response<Reply>> DeleteReply(long id);

    }
}
