using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [ApiController]
    [Route("api/users/show")]
    public class ApiUsersShow : ApiController
    {
        [HttpPost]
        public IActionResult Post([FromBody] JObject param)
        {
            var id = GetOptional<string>(param, "id");
            var name = GetOptional<string>(param, "userName");
            var host = GetOptional<string>(param, "host");

            User? user;

            if (id != null)
                user = Users.Show(id: id);
            else if (name != null)
                user = Users.Show(name: name, host: host);
            else
                return Error(404, "specify id or name");
            
            return user == null ? Error(401, "no such user") : (IActionResult)Json(user.Pack());
        }
    }
}
