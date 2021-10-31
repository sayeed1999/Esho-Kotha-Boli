using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public class Response<T>
    {
        public T Data { get; set; }
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.Ok;
        public string Message { get; set; } = "Operation Success.";
    }
}
