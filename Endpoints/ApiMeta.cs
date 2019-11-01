using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/meta")]
    public class ApiMeta : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? user)
        {
            return new {
                Name = "ActorsCafé",
                Description = "A fediverse star",
            };
        }
    }
}
