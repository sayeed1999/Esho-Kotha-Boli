using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Layer.Helpers;
using AutoMapper;
using Entity_Layer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service_Layer.CommentService;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : ControllerBase
    {
        public Util<Comment> Util { get; }
        public ICommentService CommentService { get; }
        public UserManager<User> UserManager { get; }

        public CommentsController(Util<Comment> util, ICommentService commentService, UserManager<User> userManager)
        {
            Util = util;
            CommentService = commentService;
            UserManager = userManager;
        }

        [HttpGet("Post/{id}")]
        public async Task<IActionResult> GetCommentsByPost(long id)
        {
            Response<IEnumerable<Comment>> response = await CommentService.GetCommentsByPost(id);
            return Util.GetResult(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComment(long id)
        {
            Response<Comment> response = await CommentService.GetComment(id);
            return Util.GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Comment comment)
        {
            comment.UserId = (await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email))).Id;
            Response<Comment> response = await CommentService.CreateComment(comment);
            return Util.GetResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Comment comment)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Comment> response = await CommentService.GetComment(id);
            if (response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't modify others comment!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await CommentService.UpdateComment(id, comment);
            }
            return Util.GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Comment> response = await CommentService.GetComment(id);
            if (response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't delete others comment!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await CommentService.DeleteComment(id);
            }
            return Util.GetResult(response);
        }
    }
}
