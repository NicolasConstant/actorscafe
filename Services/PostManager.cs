using System;
using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;
using LiteDB;

namespace ActorsCafe
{
    public class PostManager : ManagerBase<Post>
    {
        public override string CollectionName => "collection";

        public Post CreateNew(string? text, string? cw, string visibility, bool isLocalOnly, string userId, string? repostId = null, string? replyId = null)
        {
            var p = new Post
            {
                Id = UniqueId.Generate(),
                Text = text,
                Cw = cw,
                Visibility = visibility,
                ReplyId = replyId,
                RepostId = repostId,
                CreatedAt = DateTime.Now,
                IsLocalOnly = isLocalOnly,
                UserId = userId,
            };
            collection!.Insert(p);
            return p;
        }

        public void Delete(string noteId)
        {
            collection!.Delete(noteId);
        }

        public Post? Show(string id)
        {
            return collection?.FindById(id);
        }

        public IEnumerable<PackedPost> GetAllBy(string userId, string? filterUserId = null, int offset = 0, int limit = 100)
        {
            // todo 公開範囲と filterUserId を使ってフィルタする
            return collection!
                .Find(f => f.UserId == userId && f.Visibility == Post.VISIBILITY_PUBLIC, offset, limit)
                .Select(p => new PackedPost(p))
                .OrderByDescending(f => f.CreatedAt.Ticks);
        }
    }
}