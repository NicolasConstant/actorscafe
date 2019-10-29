using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/me")]
    public class ApiMe : ApiController
    {
        public override bool IsConfidential => true;

        public override object Handle(JObject param, string token)
        {
            return Users.Show(token).Pack();
        }
    }
}
