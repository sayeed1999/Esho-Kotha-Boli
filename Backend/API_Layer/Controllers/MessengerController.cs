using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service_Layer.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessengerController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly Util<UserForPeopleBoxVm> utilUserForPeopleBoxVm;
        private readonly UserManager<User> userManager;

        public MessengerController(
            IUserService userService,
            Util<UserForPeopleBoxVm> utilUserForPeopleBoxVm,
            UserManager<User> userManager
        )
        {
            this.userService = userService;
            this.utilUserForPeopleBoxVm = utilUserForPeopleBoxVm;
            this.userManager = userManager;
        }

        [HttpGet("people-box")]
        public async Task<IActionResult> GetPeopleBoxListAsync()
        {
            string userid = (await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email))).Id;
            Response<IEnumerable<UserForPeopleBoxVm>> response = await userService.GetUsersForPeopleBox(userid);
            return utilUserForPeopleBoxVm.GetResult(response);
        }

    }
}
