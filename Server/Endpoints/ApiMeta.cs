using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ActorsCafe.Endpoints
{
    [ApiController]
    [Route("api/meta")]
    public class ApiMeta : ApiController
    {
        [HttpPost]
        public IActionResult Post()
        {
            return Json(new {
                Name = "ActorsCafé",
                Description = "A fediverse star",
            });
        }
    }

    [ApiController]
    [Route("api/users/all")]
    public class ApiUsersAll : ApiController
    {
        [HttpPost]
        public IActionResult Post()
        {
            return Json(Users.EnumerateAll().Select(u => u.Pack()));
        }
    }
}
