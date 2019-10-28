using Microsoft.AspNetCore.Mvc;

namespace ActorsCafe.Endpoints
{
    [ApiController]
    [Route("api/meta")]
    public class ApiMeta : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(new {
                Name = "ActorsCafé",
                Description = "A fediverse star",
            });
        }
    }
}
