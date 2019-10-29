using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/users/all")]
    public class ApiUsersAll : ApiController
    {
        public override object Handle(JObject obj, string token)
        {
            return Users.EnumerateAll().Select(u => u.Pack());
        }
    }
}
