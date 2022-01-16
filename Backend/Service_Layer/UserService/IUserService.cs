using Entity_Layer;
using Entity_Layer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.UserService
{
    public interface IUserService
    {
        public Task<Response<User>> GetUserAsync(string username);
        public Task<Response<IEnumerable<UserForPeopleBoxVm>>> GetUsersForPeopleBox(string username);
    }
}
