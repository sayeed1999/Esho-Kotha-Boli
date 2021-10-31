using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Layer.Helpers;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API_Layer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private Util<User> _util { get; init; }
        private UserManager<User> _userManager { get; init; }
        private JwtHandler _jwtHandler { get; init; }
        public IHttpContextAccessor _httpContextAccessor { get; }

        public AccountController(Util<User> util, UserManager<User> userManager, JwtHandler jwtHandler, IHttpContextAccessor httpContextAccessor)
        {
            _util = util;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            User user = await _userManager.FindByEmailAsync(
                _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value);

            if (user == null)
                return NotFound(user);

            ViewUser viewUser = new()
            {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                SexId = (byte)user.Sex,
                Sex = user.Sex.ToString(),
                RelationshipStatusId = (byte)user.RelationshipStatus,
                RelationshipStatus = Enum.GetName(typeof(RelationshipStatus), user.RelationshipStatus),
            };
            
            return Ok(viewUser);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> LoginUserAsync(LoginUser loginUser)
        {
            User user = await _userManager.FindByEmailAsync(loginUser.Email);
            
            if(user == null || !(await _userManager.CheckPasswordAsync(user, loginUser.Password)))
            {
                // StatusCode: 401 (Unauthorized response)
                return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });
            }

            SigningCredentials signingCredentials = _jwtHandler.GetSigningCredentials();
            List<Claim> claims = _jwtHandler.GetClaims(user);
            JwtSecurityToken tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);

            JwtSecurityTokenHandler tokenHandler = new();
            string generatedToken = tokenHandler.WriteToken(tokenOptions);

            return Ok(new AuthResponse { UserName = user.UserName, IsAuthSuccessful = true, Token = generatedToken, ErrorMessage = null });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(RegisterUser registerUser)
        {
            Response<User> response = new();
            
            if(registerUser is null)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Model is invalid";
                return _util.GetResult(response);
            }

            if(registerUser.Password != registerUser.ConfirmPassword)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Password & Confirm Password don't match";
                return _util.GetResult(response);
            }

            try
            {
                User user = new()
                {
                    UserName = registerUser.UserName,
                    FirstName = registerUser.FirstName,
                    LastName = registerUser.LastName,
                    DateOfBirth = registerUser.DateOfBirth,
                    RelationshipStatus = registerUser.RelationshipStatus,
                    Sex = registerUser.Sex,
                    Email = registerUser.Email                    
                };
                string password = "AAAA12"; //registerUser.Password;
                
                var res = await _userManager.CreateAsync(user, password);

                if(!res.Succeeded)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "";
                    foreach(var error in res.Errors)
                    {
                        response.Message += error.Description;
                    }
                    return _util.GetResult(response);
                }

                response.Message = "New user registered successfully.";
                response.StatusCode = HttpStatusCode.Created;
                return _util.GetResult(response, "/account");
            }
            catch(Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Registration Failed. Try with proper data.";
                return _util.GetResult(response);
            }
        }

        [AllowAnonymous]
        [HttpGet("relationship-status")]
        public ActionResult<List<object>> GetAllRelationshipStatus()
        {
            List<object> collection = new();
            int i = 0;
            foreach (string status in Enum.GetNames(typeof(RelationshipStatus)))
            {
                var item = new { name = status, value = i++ };
                collection.Add(item);
            }
            return collection;
        }

        [AllowAnonymous]
        [HttpGet("sex")]
        public ActionResult<List<object>> GetAllSex()
     {
            List<object> collection = new();
            int i = 0;
            foreach(string sex in Enum.GetNames(typeof(Sex)))
            {
                var item = new { name = sex, value = i++ };
                collection.Add(item);
            }
            return collection;
        }
    }
}
