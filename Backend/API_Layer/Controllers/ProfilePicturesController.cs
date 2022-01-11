using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Service_Layer.ProfilePictureService;
using Service_Layer.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
// using Microsoft.Extensions.Caching.Memory;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("profile-picture")]
    public class ProfilePicturesController : ControllerBase
    {
        private readonly IMemoryCache cache;
        // private InMemoryCaching InMemoryCaching { get; }
        public Util<ViewProfilePicture> vmUtil { get; }
        public Util<ProfilePicture> Util { get; }
        public Util<User> UserUtil { get; }
        public UserManager<User> UserManager { get; }
        public IProfilePictureService ProfilePictureService { get; }
        public IUserService UserService { get; }

        public ProfilePicturesController(
            IMemoryCache cache,
            // InMemoryCaching InMemoryCaching,
            Util<ViewProfilePicture> vmUtil,
            Util<ProfilePicture> Util, 
            Util<User> UserUtil,
            UserManager<User> UserManager, 
            IProfilePictureService ProfilePictureService,
            IUserService UserService
            )
        {
            this.cache = cache;
            // this.InMemoryCaching = InMemoryCaching;
            this.vmUtil = vmUtil;
            this.Util = Util;
            this.UserUtil = UserUtil;
            this.UserManager = UserManager;
            this.ProfilePictureService = ProfilePictureService;
            this.UserService = UserService;
        }

        #region create
        #endregion

        #region read

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfilePictureAsync(string username) // if null, return the profile picture of the logged in user!
        {
            var cacheKey = "profilePictureOf" + username;
            Response<ViewProfilePicture> responseDP = new();

            // check if cache entries exist

            if (!cache.TryGetValue(cacheKey, out ViewProfilePicture viewProfilePicture))
            {
                // start calling the server

                Response<ProfilePicture> response = await this.ProfilePictureService.GetProfilePictureByUsernameAsync(username);
                if (response.Data is ProfilePicture && response.Data.Image is Image)
                {
                    ViewProfilePicture vmDP = new()
                    {
                        Id = response.Data.Id,
                        ByteArray = response.Data.Image.byteArray,
                        DateCreated = response.Data.DateCreated
                    };
                    responseDP.Data = vmDP;

                    // setting up cache options
                    MemoryCacheEntryOptions cacheExpiryOptions = new()
                    {
                        // AbsoluteExpiration = DateTime.Now.AddDays(1), // the cache will be deleted after full oneday!
                        Priority = CacheItemPriority.High,
                        SlidingExpiration = TimeSpan.FromHours(1), // will remain 1 hour on first pull
                    };
                    // setting cache entries
                    cache.Set(cacheKey, vmDP, cacheExpiryOptions);

                    // if it is a valid profile picture
                    return vmUtil.GetResult(responseDP);
                }
                // if profile picture is somehow null or undefined
                return Util.GetResult(response);
            }
            // profile picture of the user found
            responseDP.Data = viewProfilePicture;
            return vmUtil.GetResult(responseDP);
        }

        #endregion

        #region update
        #endregion

        #region delete
        #endregion
    }
}
