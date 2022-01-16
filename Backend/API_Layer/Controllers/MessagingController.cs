using API_Layer.Helpers;
using Entity_Layer;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.MessageService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessagingController : ControllerBase
    {
        private readonly Util<Message> utilMessage;
        private readonly IMessageService messageService;

        public MessagingController(
            Util<Message> utilMessage,
            IMessageService messageService
        )
        {
            this.utilMessage = utilMessage;
            this.messageService = messageService;
        }

        #region create

        [HttpPost("messages/create")]
        public async Task<IActionResult> SendMessageAsync(Message message) // from, to are userid's..
        {
            Response<Message> response = await messageService.CreateAsync(message);
            return utilMessage.GetResult(response);
        }

        #endregion

        #region read

        [HttpGet("messages/{from}/{to}")]
        public async Task<IActionResult> GetMessagesAsync(string from, string to) // from, to are userid's..
        {
            Response<IEnumerable<Message>> response = await messageService.GetMessagesAsync(from, to);
            return utilMessage.GetResult(response);
        }

        #endregion

        #region update
        #endregion

        #region delete
        #endregion
    }
}
