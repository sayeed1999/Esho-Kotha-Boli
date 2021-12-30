using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
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
        public Util<ViewComment> ViewUtil { get; }
        public ICommentService CommentService { get; }
        public UserManager<User> UserManager { get; }

        public CommentsController(Util<Comment> util, Util<ViewComment> viewUtil, ICommentService commentService, UserManager<User> userManager)
        {
            Util = util;
            ViewUtil = viewUtil;
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
            if (response.Data is Comment)
            {
                Comment _comment = response.Data;
                // that means the http request is a success
                ViewComment temp = new();
                temp.Body = _comment.Body;
                temp.DateCreated = _comment.DateCreated;
                temp.Id = _comment.Id;
                temp.PostId = _comment.PostId;
                temp.Replies = new();
                temp.UserId = _comment.UserId;
                temp.UserName = _comment.User.FirstName + ' ' + _comment.User.LastName;
                // setting viewReplies
                foreach (Reply reply in comment.Replies)
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
                Response<ViewComment> vcResponse = new();
                vcResponse.Data = temp;
                return ViewUtil.GetResult(vcResponse);
            }
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
