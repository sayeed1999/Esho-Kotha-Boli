using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Layer.Helpers;
using AutoMapper;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service_Layer.PostService;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        public Util<Post> Util { get; }
        public IPostService PostService { get; }

        public PostsController(Util<Post> util, IPostService postService)
        {
            Util = util;
            PostService = postService;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(long id)
        {
            Response<Post> response = await PostService.GetPostWithCommentsAndReplies(id);
            return Util.GetResult(response);
        }


        [HttpPost]
        public async Task<IActionResult> CreateAsync(Post post)
        {
            Response<Post> response = await PostService.CreatePost(post);
            return Util.GetResult(response, "/posts");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Post post)
        {
            Response<Post> response = await PostService.UpdatePost(id, post);
            return Util.GetResult(response);
        }
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            Response<Post> response = await PostService.DeletePost(id);
            return Util.GetResult(response);
        }

    }
}
