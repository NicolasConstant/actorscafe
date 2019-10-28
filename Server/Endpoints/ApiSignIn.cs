using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Crypt = BCrypt.Net.BCrypt;

namespace ActorsCafe.Endpoints
{
    [ApiController]
    [Route("api/signin")]
    public class ApiSignIn : ApiController
    {
        [HttpPost]
        public IActionResult Post([FromBody] JObject param)
        {
            try
            {
                var name = GetRequired<string>(param, "userName");
                var password = GetRequired<string>(param, "password");

                var hashed = Crypt.HashPassword(password);

                var user = Server.I.UserManager.Show(name: name);

                if (hashed != user.Password)
                    throw new ArgumentException("password incorrect");

                return Json(new {
                    Token = user.Token,
                    User = user.Pack(),
                });
            }
            catch (ArgumentException ex)
            {
                return Error(401, ex.Message);
            }
        }
    }
}
