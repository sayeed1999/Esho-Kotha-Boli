using API_Layer.Helpers;
using Entity_Layer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ProfilePictureService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfilePicturesController : ControllerBase
    {
        public Util<ProfilePicture> Util { get; }
        public UserManager<User> UserManager { get; }
        public IProfilePictureService ProfilePictureService { get; }

        public ProfilePicturesController(Util<ProfilePicture> Util, UserManager<User> UserManager, IProfilePictureService ProfilePictureService)
        {
            this.Util = Util;
            this.UserManager = UserManager;
            this.ProfilePictureService = ProfilePictureService;
        }

        #region create
        /*
        [HttpPost]
        public async Task<IActionResult> SetProfilePictureAsync(Image image)
        {
            Response<Image> response = await ImageService.UploadImage(image);
            return Util.GetResult(response, "/images");
        }
        */
        #endregion

        #region read
        #endregion

        #region update
        #endregion

        #region delete
        #endregion
    }
}
