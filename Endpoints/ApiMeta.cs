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
                Version = Server.I.Version,
                CodeName = Server.I.CodeName,
                Description = Server.I.Description,
                TermsOfService = Server.I.TermsOfService,
            };
        }
    }
}
