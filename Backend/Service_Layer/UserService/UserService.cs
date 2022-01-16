using Entity_Layer;
using Entity_Layer.Dtos;
using Repository_Layer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.UserService
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response<User>> GetUserAsync(string username)
        {
            Response<User> response = new();
            response.Data = await this.unitOfWork.UserRepository.GetFirstOrDefaultAsync(x => x.UserName == username);

            if(response.Data is null)
            {
                response.Message = "No user found with this username.";
                response.StatusCode = HttpStatusCode.NotFound;
            }
            return response;
        }

        public async Task<Response<IEnumerable<UserForPeopleBoxVm>>> GetUsersForPeopleBox(string username)
        {
            Response<IEnumerable<UserForPeopleBoxVm>> response = new();
            IEnumerable<User> users = await this.unitOfWork.UserRepository.GetWhereToListAsync(x => x.UserName != username);
            response.Data = users.Select(x => new UserForPeopleBoxVm
            {
                Id = x.Id,
                FullName = x.FirstName + ' ' + x.LastName
            });
            return response;
        }
    }
}
