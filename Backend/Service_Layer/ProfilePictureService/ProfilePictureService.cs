using Entity_Layer;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ProfilePictureService
{
    public class ProfilePictureService : IProfilePictureService
    {
        private readonly IUnitOfWork unitOfWork;

        public ProfilePictureService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response<ProfilePicture>> GetProfilePictureAsync(string userId)
        {
            Response<ProfilePicture> response = new();
            response.Data = await this.unitOfWork.ProfilePictureRepository.GetFirstOrDefaultAsync(
                                                                            x => x.User.Id == userId,
                                                                            src => src.Include(x => x.User),
                                                                            src => src.Include(x => x.Image)
                                                                        );
            return response;
        }

        public async Task<Response<ProfilePicture>> GetProfilePictureByUsernameAsync(string username)
        {
            Response<ProfilePicture> response = new();
            response.Data = await this.unitOfWork.ProfilePictureRepository.GetFirstOrDefaultAsync(
                                                                            x => x.User.UserName == username,
                                                                            src => src.Include(x => x.User),
                                                                            src => src.Include(x => x.Image)
                                                                        );
            return response;
        }

        public async Task<Response<ProfilePicture>> SetProfilePictureAsync(string userId, long imageId)
        {
            var response = new Response<ProfilePicture>();
            ProfilePicture picture = await this.unitOfWork.ProfilePictureRepository.GetFirstOrDefaultAsync(x => x.UserId == userId);
            if(picture is null)
            {
                response.Message = "Image not found to set as profile picture.";
                response.StatusCode = HttpStatusCode.NotFound;
            }
            else
            {
                picture.ImageId = imageId;
                response = await unitOfWork.ProfilePictureRepository.UpdateAsync(picture.Id, picture);
                try
                {
                    await unitOfWork.CompleteAsync();
                }
                catch (Exception ex)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "Failed!";
                }
            }
            return response;
        }
    }
}
