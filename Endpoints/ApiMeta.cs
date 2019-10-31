using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/meta")]
    public class ApiMeta : ApiController
    {
        public override object Handle(JObject param, string token)
        {
            return new {
                Name = "ActorsCafé",
                Description = "A fediverse star",
            };
        }
    }
}
