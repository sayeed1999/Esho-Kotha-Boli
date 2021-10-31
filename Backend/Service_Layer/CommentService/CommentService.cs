using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.UnitOfWork;

namespace Service_Layer.CommentService
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CommentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<Comment>> CreateComment(Comment comment)
        {
            Response<Comment> response = new Response<Comment>();

            // check the PostId exists or not.
            Post post = await _unitOfWork.PostRepository.FindAsync(comment.PostId);
            if(post == null)
            {
                response.Message = "Post not found";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else if (String.IsNullOrWhiteSpace(comment.Body))
            {
                response.Message = "Comment body cannot be null or white space";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                response = await _unitOfWork.CommentRepository.AddAsync(comment);
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

        public async Task<Response<Comment>> DeleteComment(long id)
        {
            var response = new Response<Comment>();
            response = await _unitOfWork.CommentRepository.DeleteAsync(id);
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

        public async Task<Response<Comment>> GetComment(long id)
        {
            Response<Comment> response = await _unitOfWork.CommentRepository.GetByIdAsync(id);
            return response;
        }

        public async Task<Response<IEnumerable<Comment>>> GetCommentsByPost(long postId)
        {
            var response = new Response<IEnumerable<Comment>>();
            try
            {
                IEnumerable<Comment> comments = await _unitOfWork.CommentRepository.GetWhereToListAsync(x => x.PostId == postId, null, null);
                response.Data = comments;
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed!";
            }
            return response;
        }

        public async Task<Response<Comment>> UpdateComment(long id, Comment comment)
        {
            Response<Comment> response = new Response<Comment>();

            if (comment is not null && String.IsNullOrWhiteSpace(comment.Body))
            {
                response.Message = "Comment body cannot be null or white space";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                response = await _unitOfWork.CommentRepository.UpdateAsync(id, comment);
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
    }
}
