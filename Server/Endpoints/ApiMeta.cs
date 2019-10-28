using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
