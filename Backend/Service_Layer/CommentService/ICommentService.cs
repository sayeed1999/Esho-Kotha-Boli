using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;

namespace Service_Layer.CommentService
{
    public interface ICommentService
    {
        // Create
        Task<Response<Comment>> CreateComment(Comment comment);

        // Read
        Task<Response<IEnumerable<Comment>>> GetCommentsByPost(long postId);
        Task<Response<Comment>> GetComment(long id);

        // Update
        Task<Response<Comment>> UpdateComment(long id, Comment comment);

        // Delete
        Task<Response<Comment>> DeleteComment(long id);
    }
}
