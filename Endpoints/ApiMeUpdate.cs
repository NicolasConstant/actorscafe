using System;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/me/update")]
    public class ApiMeUpdate : ApiController
    {
        public override bool IsConfidential => true;

        public override object Handle(JObject p, string token, InternalUser? user)
        {
            var profileName = GetOptional<string>(p, "profileName");
            var description = GetOptional<string>(p, "description");
            var isBot = GetOptionalValue<bool>(p, "isBot");
            var isCat = GetOptionalValue<bool>(p, "isCat");

            if (user == null) throw new InvalidOperationException();

            user.ProfileName = profileName ?? user.ProfileName;
            user.Description = description ?? user.Description;
            user.IsBot = isBot ?? user.IsBot;
            user.IsCat = isCat ?? user.IsCat;

            Users.UpdateUser(user);

            return new { };
        }
    }
}
