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
        private readonly IHubContext<MessageHub> _hubContext;
        public Util<Comment> Util { get; }
        public ICommentService CommentService { get; }
        public UserManager<User> UserManager { get; }

        public CommentsController(IHubContext<MessageHub> hubContext, Util<Comment> util, ICommentService commentService, UserManager<User> userManager)
        {
            this._hubContext = hubContext;
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
            if (response.StatusCode == HttpStatusCode.NotFound || response.StatusCode == HttpStatusCode.Created)
            {
                await _hubContext.Clients.All.SendAsync("NewComment", comment);
            }
            return Util.GetResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Comment comment)
        {
            Response<Comment> response = await CommentService.UpdateComment(id, comment);
            return Util.GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            Response<Comment> response = await CommentService.DeleteComment(id);
            return Util.GetResult(response);
        }
    }
}
