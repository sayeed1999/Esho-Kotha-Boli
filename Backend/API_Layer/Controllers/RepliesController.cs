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
using Service_Layer.ReplyService;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepliesController : ControllerBase
    {
        public UserManager<User> UserManager { get; }
        public Util<Reply> Util { get; }
        public Util<ViewReply> ViewUtil { get; }
        public IReplyService ReplyService { get; }

        public RepliesController(Util<Reply> util, Util<ViewReply> viewUtil, IReplyService replyService, UserManager<User> userManager)
        {
            Util = util;
            ViewUtil = viewUtil;
            ReplyService = replyService;
            UserManager = userManager;
        }

        [HttpGet("Post/{id}")]
        public async Task<IActionResult> GetRepliesByPost(long id)
        {
            Response<IEnumerable<Reply>> response = await ReplyService.GetRepliesByComment(id);
            return Util.GetResult(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReply(long id)
        {
            Response<Reply> response = await ReplyService.GetReply(id);
            return Util.GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Reply reply)
        {
            reply.UserId = (await UserManager.FindByEmailAsync(HttpContext.User.FindFirstValue(ClaimTypes.Email))).Id;
            Response<Reply> response = await ReplyService.CreateReply(reply);
            if(response.Data is Reply)
            {
                ViewReply temp2 = new();
                temp2.Body = reply.Body;
                temp2.CommentId = reply.CommentId;
                temp2.DateCreated = reply.DateCreated;
                temp2.Id = reply.Id;
                temp2.UserId = reply.UserId;
                temp2.UserName = reply.User.UserName;
                temp2.FullName = reply.User.FirstName + ' ' + reply.User.LastName;

                Response<ViewReply> vrResponse = new();
                vrResponse.Data = temp2;
                return ViewUtil.GetResult(vrResponse);
            }
            return Util.GetResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Reply reply)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Reply> response = await ReplyService.GetReply(id);
            if (response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't modify others reply!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await ReplyService.UpdateReply(id, reply);
            }
            return Util.GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            User user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            string currentUserId = user.Id;
            Response<Reply> response = await ReplyService.GetReply(id);
            if (response.Data is not null && response.Data.UserId != currentUserId)
            {
                response.Message = "[x] You can't delete others reply!";
                response.StatusCode = HttpStatusCode.Forbidden;
            }
            else
            {
                response = await ReplyService.DeleteReply(id);
            }
            return Util.GetResult(response);
        }
    }
}
