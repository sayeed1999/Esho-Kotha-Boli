using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class AuthResponse
    {
        public string UserName { get; set; } = null;
        public bool IsAuthSuccessful { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}
