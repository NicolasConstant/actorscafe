using System;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/following/delete")]
    public class ApiFollowingDelete : ApiController
    {
        public override bool IsConfidential => true;

        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var userId = GetRequired<string>(param, "userId");            

            var followee = Users.Show(userId) ?? throw new HttpErrorException(400, "no such user");           

            try
            {
                Followings.Delete(user!, followee);
                return new { };
            }
            catch (ArgumentException e)
            {
                throw new HttpErrorException(400, e.Message);
            }
        }
    }
}
