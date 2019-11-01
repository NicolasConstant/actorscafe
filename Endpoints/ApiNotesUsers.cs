using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/notes/users")]
    public class ApiNotesUsers : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var userId = GetRequired<string>(param, "userId");

            var all = Posts.GetAllBy(userId, user?.Id);
            
            return all;
        }
    }
}
