using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/posts/delete")]
    public class ApiPostsDelete : ApiController
    {
        public override bool IsConfidential => true;

        public override object Handle(JObject param, string token, InternalUser? user)
        {
            var id = GetRequired<string>(param, "postId");

            var post = Posts.Show(id);

            if (post == null)
            {
                // Post がない
                throw new HttpErrorException(404, "no such post");
            }
            if (post.UserId != user!.Id && !user!.IsAdmin && !user!.IsModerator)
            {
                // Post の投稿主でも、管理者でも、モデレーターでもないため削除できない
                throw new HttpErrorException(403, "permission denied");
            }
            // 削除
            Posts.Delete(id);

            return new { };
        }
    }
}
