using System.Linq;
using ActorsCafe.Internal;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [Route("api/my/timeline")]
    public class ApiMyTimeline : ApiController
    {
        public override bool IsConfidential => true;
        
        public override object Handle(JObject p, string token, InternalUser? user)
        {
            //hack 続きを読めるようにもっとまともな実装にする
            var u = user!;

            var posts = Posts.GetAllBy(u.Id);
            foreach (var uid in Followings.GetFollowings(u.Id))
            {
                posts = posts.Concat(Posts.GetAllBy(uid, u.Id));
            }
            posts = posts.OrderByDescending(p => p.CreatedAt.Ticks).Take(100);
            return posts;
        }
    }
}
