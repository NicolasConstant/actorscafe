using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/notes/create")]
    public class ApiNotesCreate : ApiController
    {
        public override bool IsConfidential => true;

        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var text = GetOptional<string>(param, "text");
            var cw = GetOptional<string>(param, "cw");
            var visibility = GetOptional<string>(param, "visibility") ?? ActorsCafe.Post.VISIBILITY_PUBLIC;
            var isLocalOnly = GetOptionalValue<bool>(param, "isLocalOnly") ?? false;
            var repostId = GetOptional<string>(param, "repostId");
            var replyId = GetOptional<string>(param, "replyId");

            if (text == null && repostId == null)
            {
                throw new HttpErrorException(400, "Both text and repostId cannot be omitted.");
            }

            if (text == null && replyId != null)
            {
                throw new HttpErrorException(400, "Reply must have text.");
            }

            var post = Posts.CreateNew(text, cw, visibility, isLocalOnly, user!.Id, repostId, replyId);
            
            return new PackedPost(post);
        }
    }
}
