using Entity_Layer;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer.HubConfig
{
    public class MessagingHub : Hub
    {
        public async Task MessageSent(Message message, string userId)
        {
            var abc = Context.UserIdentifier;
            await Clients.User(userId).SendAsync("messageSent", message);
        }
    }
}
