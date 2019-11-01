using System;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/notes/show")]
    public class ApiNotesShow : ApiController
    {
        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var id = GetRequired<string>(param, "id");

            var post = Posts.Show(id) ?? throw new HttpErrorException(404, "No such post");
            
            return new PackedPost(post);
        }
    }
}
