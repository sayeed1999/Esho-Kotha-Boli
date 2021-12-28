using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service_Layer.PostService;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        public Util<Post> Util { get; }
        public Util<ViewPost> UtilViewPost { get; }
        public IPostService PostService { get; }
        public UserManager<User> UserManager { get; }

        public PostsController(Util<Post> util, Util<ViewPost> utilViewPost, IPostService postService, UserManager<User> userManager)
        {
            Util = util;
            UtilViewPost = utilViewPost;
            PostService = postService;
            UserManager = userManager;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(long id)
        {
            Response<Post> response = await PostService.GetPostWithCommentsAndReplies(id);
            // mapping from original Post to ViewPost so that user secret information dont get exposed!
            Response<ViewPost> newResponse = new();
            newResponse.Message = response.Message;
            newResponse.StatusCode = response.StatusCode;
            if(response.Data is Post)
            {
                ViewPost viewPost = new();
                viewPost.Body = response.Data.Body;
                viewPost.DateCreated = response.Data.DateCreated;
                viewPost.Comments = new();
                viewPost.Id = response.Data.Id;
                viewPost.UserId = response.Data.UserId;
                viewPost.UserName = response.Data.User.FirstName + ' ' + response.Data.User.LastName;
                // setting viewComments
                foreach(Comment comment in response.Data.Comments)
                {
                    ViewComment temp = new();
                    temp.Body = comment.Body;
                    temp.DateCreated = comment.DateCreated;
                    temp.Id = comment.Id;
                    temp.PostId = response.Data.Id;
                    temp.Replies = new();
                    temp.UserId = comment.UserId;
                    temp.UserName = comment.User.FirstName + ' ' + comment.User.LastName;
                    // setting viewReplies
                    foreach(Reply reply in comment.Replies)
                    {
                        ViewReply temp2 = new();
                        temp2.Body = reply.Body;
                        temp2.CommentId = reply.CommentId;
                        temp2.DateCreated = reply.DateCreated;
                        temp2.Id = reply.Id;
                        temp2.UserId = reply.UserId;
                        temp2.UserName = reply.User.FirstName + ' ' + reply.User.LastName;
                        temp.Replies.Add(temp2);
                    }
                    viewPost.Comments.Add(temp);
                }
                newResponse.Data = viewPost;
                return UtilViewPost.GetResult(newResponse);
            }
            //mapping ends..
            return Util.GetResult(response);
        }


        [HttpPost]
        public async Task<IActionResult> CreateAsync(Post post)
        {
            post.UserId = (await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email))).Id;
            Response<Post> response = await PostService.CreatePost(post);
            return Util.GetResult(response, "/posts");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Post post)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Post> response = await PostService.GetPost(id);
            if (response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't modify others post!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await PostService.UpdatePost(id, post);
            }
            return Util.GetResult(response);
        }
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Post> response = await PostService.GetPost(id);
            if(response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't delete others post!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await PostService.DeletePost(id);
            }
            return Util.GetResult(response);
        }
    }
}
