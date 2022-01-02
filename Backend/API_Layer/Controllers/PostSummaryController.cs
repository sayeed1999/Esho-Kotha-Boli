using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.PostService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("posts/all-summary")]
    public class PostSummaryController : ControllerBase
    {
        public Util<PostSummary> Util { get; }
        public IPostService PostService { get; }

        public PostSummaryController(Util<PostSummary> util, IPostService postService)
        {
            Util = util;
            PostService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSummary(int? page = 1, int? count = 5)
        {
            Response<IEnumerable<PostSummary>> response = new Response<IEnumerable<PostSummary>>();
            try
            {
                response = await PostService.GetAllSummaryAsync((int)page, (int)count);
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            return Util.GetResult(response);
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetAllSummaryByUser(string username, int? page = 1, int? count = 5)
        {
            Response<IEnumerable<PostSummary>> response = new Response<IEnumerable<PostSummary>>();
            try
            {
                response = await PostService.GetAllSummaryByUserAsync(username, (int)page, (int)count);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
            }
            return Util.GetResult(response);
        }

    }
}
