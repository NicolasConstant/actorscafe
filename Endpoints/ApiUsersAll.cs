using System.Linq;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/users/all")]
    public class ApiUsersAll : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var offset = GetOptionalValue<int>(param, "offset") ?? 0;
            var limit = GetOptionalValue<int>(param, "limit") ?? 100;

            return Users.EnumerateAll(offset, limit).Select(u => u.Pack(user));
        }
    }
}
