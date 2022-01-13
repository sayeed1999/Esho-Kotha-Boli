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

        public NewsfeedHub(IPostService postService)
        {
            this.postService = postService;
        }

        public async Task NewPostCreated(long postId)
        {
            Response<PostSummary> response = await postService.GetSummaryByPostId(postId);
            await Clients.Others.SendAsync("newPostFound", response.Data);
        }
    }
}
