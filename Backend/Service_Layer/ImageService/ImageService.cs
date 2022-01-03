using Entity_Layer;
using Repository_Layer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.ImageService
{
    public class ImageService : IImageService
    {
        private readonly IUnitOfWork unitOfWork;
        public ImageService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response<Image>> UploadImageAsync(Image item)
        {
            Response<Image> response = await this.unitOfWork.ImageRepository.AddAsync(item);
            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch(Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Upload Failed!";
            }
            return response;
        }
    }
}
