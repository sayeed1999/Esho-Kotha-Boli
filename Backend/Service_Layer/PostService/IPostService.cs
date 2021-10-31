using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;

namespace Service_Layer.PostService
{
    public interface IPostService
    {
        // Create
        Task<Response<Post>> CreatePost(Post post);

        // Read
        public Task<Response<IEnumerable<Post>>> GetAllSummaryAsync(int page);
        Task<Response<IEnumerable<Post>>> GetPostsWithCommentsAndReplies(int page, int number);
        Task<Response<IEnumerable<Post>>> GetPosts();
        public Task<Response<Post>> GetPostWithCommentsAndReplies(long id);
        Task<Response<Post>> GetPost(long id);

        // Update
        Task<Response<Post>> UpdatePost(long id, Post post);

        // Delete
        Task<Response<Post>> DeletePost(long id);
    }
}
