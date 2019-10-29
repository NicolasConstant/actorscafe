using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Crypt = BCrypt.Net.BCrypt;

namespace ActorsCafe.Endpoints
{
    [Route("api/signup")]
    public class ApiSignUp : ApiController
    {
        public override object Handle(JObject param, string token)
        {
            try
            {
                var name = GetRequired<string>(param, "userName");
                var password = GetRequired<string>(param, "password");

                var hashed = Crypt.HashPassword(password);

                var user = Server.I.UserManager.CreateNewUser(name, hashed);

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
