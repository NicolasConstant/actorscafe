using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/users/followings")]
    public class ApiUsersFollowings : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? me)
        {
            var userId = GetRequired<string>(param, "userId");
            var offset = GetOptionalValue<int>(param, "offset") ?? 0;
            var limit = GetOptionalValue<int>(param, "limit") ?? 100;

            IEnumerable<User> followings = Followings.GetFollowings(userId, offset, limit)
                .Select(id => Users.Show(id: id))
                .Select(u => u?.Pack(me))
                .OfType<User>();
            
            return followings;
        }
    }
}
