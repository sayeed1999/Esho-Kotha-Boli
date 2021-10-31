using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public enum HttpStatusCode
    {
        // Successful Responses
        Ok, // 200
        Created, // 201
        // Client Error Responses
        BadRequest, // 400
        Unauthorized, // 401
        Forbidden, // 403
        NotFound, // 404
        InternalServerError, // 500
    }
}
