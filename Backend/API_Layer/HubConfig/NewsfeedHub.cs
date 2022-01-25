using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.SignalR;
using Service_Layer.PostService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer.HubConfig
{
    public class NewsfeedHub : Hub
    {
        private readonly IPostService postService;
        private readonly static ConnectionMapping<string> _connections = new();

        public NewsfeedHub(IPostService postService)
        {
            this.postService = postService;
        }

        public void CustomOnConnected(string userId)
        {
            _connections.Add(userId, Context.ConnectionId);
        }

        public async Task NewPostCreated(long postId)
        {
            Response<PostSummary> response = await postService.GetSummaryByPostId(postId);
            await Clients.Others.SendAsync("newPostReceived", response.Data, "New post on top", "New Post!");
        }

        public async Task PostHasBeenUpdated(ViewPost data)
        {
            await Clients.Others.SendAsync("postHasBeenUpdated", data, "A post has been updated", "Post Update!");
        }

        public async Task PostHasBeenDeleted(long postId)
        {
            await Clients.Others.SendAsync("postHasBeenDeleted", postId, "A post has been deleted", "Post Delete!");
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
