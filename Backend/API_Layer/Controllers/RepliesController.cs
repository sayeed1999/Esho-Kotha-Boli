using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Layer.Helpers;
using Entity_Layer;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ReplyService;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepliesController : ControllerBase
    {
        public Util<Reply> Util { get; }
        public IReplyService ReplyService { get; }

        public RepliesController(Util<Reply> util, IReplyService replyService)
        {
            Util = util;
            ReplyService = replyService;
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
            Response<Reply> response = await ReplyService.CreateReply(reply);
            return Util.GetResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Reply reply)
        {
            Response<Reply> response = await ReplyService.UpdateReply(id, reply);
            return Util.GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            Response<Reply> response = await ReplyService.DeleteReply(id);
            return Util.GetResult(response);
        }
    }
}
