using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ProfilePictureService;
using Service_Layer.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("profile-picture")]
    public class ProfilePicturesController : ControllerBase
    {
        public Util<ViewProfilePicture> vmUtil { get; }
        public Util<ProfilePicture> Util { get; }
        public Util<User> UserUtil { get; }
        public UserManager<User> UserManager { get; }
        public IProfilePictureService ProfilePictureService { get; }
        public IUserService UserService { get; }

        public ProfilePicturesController(
            Util<ViewProfilePicture> vmUtil,
            Util<ProfilePicture> Util, 
            Util<User> UserUtil,
            UserManager<User> UserManager, 
            IProfilePictureService ProfilePictureService,
            IUserService UserService
            )
        {
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
            Response<User> userResponse = await this.UserService.GetUserAsync(username);
            if(userResponse.Data is null)
            {
                return UserUtil.GetResult(userResponse);
            }

            // from here, user is not null.

            Response<ProfilePicture> response = await this.ProfilePictureService.GetProfilePictureAsync(userResponse.Data.Id);
            if(response.Data is ProfilePicture && response.Data.Image is Image)
            {
                ViewProfilePicture vmDP = new()
                {
                    Id = response.Data.Id,
                    ByteArray = response.Data.Image.byteArray,
                    DateCreated = response.Data.DateCreated
                };
                Response<ViewProfilePicture> responseDP = new() { Data = vmDP };
                return vmUtil.GetResult(responseDP);
            }
            return Util.GetResult(response);
        }

        #endregion

        #region update
        #endregion

        #region delete
        #endregion
    }
}
