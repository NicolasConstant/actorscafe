using System;
using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;
using LiteDB;

namespace ActorsCafe
{
    public class PostManager
    {
        public PostManager()
        {
            (db, posts) = GetRepository();
        }

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
            posts!.Insert(p);
            return p;
        }

        public void Delete(string noteId)
        {
            posts!.Delete(noteId);
        }

        public Post? Show(string id)
        {
            return posts?.FindById(id);
        }

        public IEnumerable<PackedPost> GetAllBy(string userId, string? filterUserId)
        {
            // todo 公開範囲と filterUserId を使ってフィルタする
            return posts!
                // ユーザーに合致
                .Include(f => f.UserId == userId)
                // 公開投稿である
                .Include(f => f.Visibility == Post.VISIBILITY_PUBLIC)
                .FindAll()
                .Select(p => new PackedPost(p))
                .OrderByDescending(f => f.CreatedAt.Ticks);
        }

        private (LiteDatabase, LiteCollection<Post>) GetRepository()
        {
            var db = Server.DatabaseRef;
            var c = db.GetCollection<Post>("posts");
            c.EnsureIndex(p => p.Id, true);
            return (db, c);
        }

        private LiteDatabase? db;
        private LiteCollection<Post>? posts;
    }
}