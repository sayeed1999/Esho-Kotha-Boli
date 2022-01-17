using Entity_Layer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API_Layer.HubConfig
{
    public class MessagingHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections = new();

        public void CustomOnConnected(string userId)
        {
            _connections.Add(userId, Context.ConnectionId);
        }

        public async Task MessageSent(Message message, IEnumerable<string> connectionIds)
        {
            await Clients.Clients(connectionIds).SendAsync("messageSent", message, "New message received", "New message!");
        }

        public IEnumerable<string> GetConnectionIds(string userId)
        {
            var x = _connections.GetConnections(userId);
            return x;
        }
    }
}
