using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.ImageService;
using Service_Layer.ProfilePictureService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        public Util<Image> Util { get; }
        public Util<ViewProfilePicture> vmDPUtil { get; }
        public UserManager<User> UserManager { get; }
        public IImageService ImageService { get; }
        public IProfilePictureService ProfilePictureService { get; }
        
        public ImagesController
        (
            Util<Image> Util,
            Util<ViewProfilePicture> vmDPUtil,
            UserManager<User> UserManager, 
            IImageService ImageService, 
            IProfilePictureService ProfilePictureService
        )
        {
            this.Util = Util;
            this.vmDPUtil = vmDPUtil;
            this.UserManager = UserManager;
            this.ImageService = ImageService;
            this.ProfilePictureService = ProfilePictureService;
        }

        #region create

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Image image)
        {
            image.UserId = (await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email))).Id;
            Response<Image> response = await ImageService.UploadImageAsync(image);
            return Util.GetResult(response, "/images");
        }

        [HttpPost("upload-profile-picture"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadProfilePictureAsync()
        {
            var file = Request.Form.FirstOrDefault();
            string path = @"C:\Users\BS662\Downloads";
            var filename = file.Value.ToString().Split("\\")[2];

            byte[] bytes = System.IO.File.ReadAllBytes(path + '\\' + filename);

            Image image = new()
            {
                byteArray = bytes,
                UserId = (await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email))).Id
            };

            // atfirst the image is uploaded for the dedicated user
            Response<Image> response01 = await ImageService.UploadImageAsync(image);

            // then set the profile picture
            Response<ProfilePicture> response02 = await ProfilePictureService.SetProfilePictureAsync(image.UserId, response01.Data.Id);

            // the pic is uploaded, now sent it to frontend to render!
            if(response01.Data is Image && response02.Data is ProfilePicture)
            {
                Response<ViewProfilePicture> vmDPResponse = new();
                vmDPResponse.Data = new()
                {
                    Id = response02.Data.Id,
                    ByteArray = response01.Data.byteArray,
                    DateCreated = response01.Data.DateCreated
                };
                return vmDPUtil.GetResult(vmDPResponse, "/images");
            }

            return Util.GetResult(response01, "/images");
            // there are flaws in this code. here two things happening. uploading image, working on propic table, what if first one succeeds, second operation fails!
        }


        #endregion

        #region read
        #endregion

        #region update
        #endregion

        #region delete
        #endregion
    }
}
