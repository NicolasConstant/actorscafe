using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Crypt = BCrypt.Net.BCrypt;

namespace ActorsCafe.Endpoints
{
    [Route("api/signin")]
    public class ApiSignIn : ApiController
    {
        public override object Handle(JObject param, string token)
        {
            var name = GetRequired<string>(param, "userName");
            var password = GetRequired<string>(param, "password");

            if (!name.IsValidUserName())
                throw new HttpErrorException(400, "invalid user name");
            
            var user = Server.I.UserManager.Show(name: name) ?? throw new HttpErrorException(400, "no such user");
            
            if (!Crypt.Verify(password, user.Password))
                throw new HttpErrorException(400, "password incorrect");

            return new {
                Token = user.Token,
                User = user.Pack(),
            };
        }
    }
}
