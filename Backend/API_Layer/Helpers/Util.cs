using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity_Layer;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Helpers
{
    public class Util<T> : ControllerBase where T : class
    {
        public IActionResult GetResult(Response<IEnumerable<T>> response, string path = "")
        {
            if (response.StatusCode == HttpStatusCode.Ok) // 200
                return Ok(response.Data);

            if (response.StatusCode == HttpStatusCode.Created) // 201
                return Created(path, response.Data);

            if (response.StatusCode == HttpStatusCode.BadRequest) // 400
                return BadRequest(response.Message);

            if (response.StatusCode == HttpStatusCode.Unauthorized) // 401 (unauthenticated)
                return Unauthorized("You must log in before performing this action.");

            if (response.StatusCode == HttpStatusCode.Forbidden) // 403 (unauthorized)
                //return new StatusCodeResult(403);
                return StatusCode(403, "Forbidden! You are not authorized for this action.");

            if (response.StatusCode == HttpStatusCode.NotFound) // 404
                return NotFound(response.Message);

            if (response.StatusCode == HttpStatusCode.InternalServerError) // 500
                return StatusCode(500, response.Message);

            return Ok(response.Data); // Ok by default!
        }

        public IActionResult GetResult(Response<T> response, string path = "")
        {
            if (response.StatusCode == HttpStatusCode.Ok) // 200
                return Ok(response.Data);

            if (response.StatusCode == HttpStatusCode.Created) // 201
                return Created(path, response.Data);

            if (response.StatusCode == HttpStatusCode.BadRequest) // 400
                return BadRequest(response.Message);

            if (response.StatusCode == HttpStatusCode.Unauthorized) // 401 (unauthenticated)
                return Unauthorized("You must log in before performing this action.");

            if (response.StatusCode == HttpStatusCode.Forbidden) // 403 (unauthorized)
                //return new StatusCodeResult(403);
                return StatusCode(403, "Forbidden! You are not authorized for this action.");

            if (response.StatusCode == HttpStatusCode.NotFound) // 404
                return NotFound(response.Message);

            if (response.StatusCode == HttpStatusCode.InternalServerError) // 500
                return StatusCode(500, response.Message);

            return Ok(response.Data); // Ok by default!
        }
    }
}
