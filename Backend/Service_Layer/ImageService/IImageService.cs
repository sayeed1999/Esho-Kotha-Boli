using Entity_Layer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ImageService
{
    public interface IImageService
    {
        public Task<Response<Image>> UploadImageAsync(Image item);
    }
}
