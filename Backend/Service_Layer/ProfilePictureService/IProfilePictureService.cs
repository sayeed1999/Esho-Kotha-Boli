using Entity_Layer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ProfilePictureService
{
    public interface IProfilePictureService
    {
        public Task<Response<ProfilePicture>> SetProfilePictureAsync(string userId, long imageId);
        public Task<Response<ProfilePicture>> GetProfilePictureAsync(string userId);
        public Task<Response<ProfilePicture>> GetProfilePictureByUsernameAsync(string username);

    }
}
