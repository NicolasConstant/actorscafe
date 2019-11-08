using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/users/show")]
    public class ApiUsersShow : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? me)
        {
            var id = GetOptional<string>(param, "postId");
            var name = GetOptional<string>(param, "userName");
            var host = GetOptional<string>(param, "host");

            InternalUser? user;

            if (id != null)
                user = Users.Show(id: id);
            else if (name != null)
                user = Users.Show(name: name, host: host);
            else
                throw new HttpErrorException(404, "specify id or name");

            return user?.Pack(me) ?? throw new HttpErrorException(404, "No such user");
        }
    }
}
