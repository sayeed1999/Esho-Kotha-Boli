using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.UnitOfWork;

namespace Service_Layer.PostService
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<IEnumerable<PostSummary>>> GetAllSummaryAsync(int page)
        {
            return await this._unitOfWork.PostSummaryRepository.GetAllPostSummary(page);
        }

        public async Task<Response<Post>> CreatePost(Post post)
        {
            var response = new Response<Post>();

            if(post is not null && String.IsNullOrWhiteSpace(post.Body))
            {
                response.Message = "Post body cannot be null, empty or white space!";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                response = await _unitOfWork.PostRepository.AddAsync(post);
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

        public async Task<Response<Post>> DeletePost(long id)
        {
            var response = new Response<Post>();
            response = await _unitOfWork.PostRepository.DeleteAsync(id);
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

        public async Task<Response<IEnumerable<Post>>> GetPostsWithCommentsAndReplies(int page, int number)
        {
            Response<IEnumerable<Post>> response = new Response<IEnumerable<Post>>();
            try
            {
                IEnumerable<Post> posts = await _unitOfWork.PostRepository.GetWhereToListAsync(
                                                            x => 1 == 1,
                                                            orderBy: src => src.OrderByDescending(x => x.Id),
                                                            include: src => src.Include(x => x.Comments)
                                                                               .ThenInclude(x => x.Replies),
                                                            true,
                                                            page,
                                                            number
                                                       );
                response.Data = posts;
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed";
            }
            return response;
        }

        public async Task<Response<IEnumerable<Post>>> GetPosts()
        {
            Response<IEnumerable<Post>> response = await _unitOfWork.PostRepository.GetAllAsync();
            return response;
        }

        public async Task<Response<Post>> GetPostWithCommentsAndReplies(long id)
        {
            Response<Post> response = new Response<Post>();
            try
            {
                Post post = await _unitOfWork.PostRepository.GetFirstOrDefaultAsync(
                                                            x => x.Id == id,
                                                            include: src => src.Include(x => x.Comments)
                                                                               .ThenInclude(x => x.Replies),
                                                            orderBy: src => src.OrderBy(x => x.Body)
                                                       );
                response.Data = post;
            }
            catch(Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Failed";
            }
            return response;
        }

        public async Task<Response<Post>> GetPost(long id)
        {
            Response<Post> response = await _unitOfWork.PostRepository.GetByIdAsync(id);
            return response;
        }

        public async Task<Response<Post>> UpdatePost(long id, Post post)
        {
            Response<Post> response = new Response<Post>();
            
            if(post is not null && String.IsNullOrWhiteSpace(post.Body))
            {
                response.Message = "Post body cannot be null or white space";
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                response = await _unitOfWork.PostRepository.UpdateAsync(id, post);
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
