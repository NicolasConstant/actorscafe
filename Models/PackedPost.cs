using ActorsCafe.Internal;
using LiteDB;

namespace ActorsCafe
{
    public class PackedPost : Post
    {
        public PackedPost? Reply { get; set; }
        public PackedPost? Repost { get; set; }
        public User User { get; set; }

        public PackedPost(Post post)
        {
            if (ReplyId != null)
            {
                var reply = Server.I.PostManager.Show(ReplyId);
                Reply = reply != null ? new PackedPost(reply) : null;
            }

            if (RepostId != null)
            {
                var repost = Server.I.PostManager.Show(RepostId);
                Repost = repost != null ?  new PackedPost(repost) : null;
            }
            User = Server.I.UserManager.Show(post.UserId).Pack();
        }
    }
}