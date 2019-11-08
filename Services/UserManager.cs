using System;
using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;
using LiteDB;

namespace ActorsCafe
{
    public class UserManager : ManagerBase<InternalUser>
    {
        public override string CollectionName => "users";

        public InternalUser CreateNewUser(string name, string hash)
        {
            if (collection!.Exists(f => f.Name.ToLowerInvariant() == name.ToLowerInvariant()))
                throw new ArgumentException("already exists");
            if (!name.IsValidUserName())
            {
                throw new ArgumentException("invalid user name");
            }
            var ts = DateTime.Now;
            var u = new InternalUser
            {
                Name = name,
                Id = UniqueId.Generate(),
                CreatedAt = ts,
                UpdatedAt = ts,
                Password = hash,
                Token = UniqueId.Generate(),
            };
            collection!.Insert(u);
            return u;
        }

        public void IncrementFollowingsCount(InternalUser me, int amount = 1)
        {
            me.FollowingsCount += amount;
            collection!.Update(me);
        }

        public void IncrementFollowersCount(InternalUser me, int amount = 1)
        {
            me.FollowersCount += amount;
            collection!.Update(me);
        }

        public InternalUser? Show(string? id = null, string? name = null, string? host = null)
        {
            if (id != null)
            {
                return collection!.FindById(id);
            }
            else if (name != null)
            {
                return collection!.FindOne(u => u.Name.ToLowerInvariant() == name.ToLowerInvariant() && (u.Host ?? "").ToLowerInvariant() == (host ?? "").ToLowerInvariant());
            }
            else
            {
                throw new ArgumentException("Please specify ID or name.");
            }
        }

        public InternalUser Show(string token)
        {
            return collection!.FindOne(u => u.Token == token);
        }

        public IEnumerable<InternalUser> EnumerateAll(int offset = 0, int limit = 100)
        {
            return collection!.Find(u => true, offset, limit);
        }

        public void Normalize()
        {
            var p = Server.I.PostManager;
            var f = Server.I.FollowingManager;
            collection!.Update(
                collection.FindAll()
                    .Select(u =>
                    {
                        u.PostsCount = p.CountPostsOf(u.Id);
                        u.FollowingsCount = f.CountFollowings(u.Id);
                        u.FollowersCount = f.CountFollowers(u.Id);
                        return u;
                    })
            );
        }

        public void UpdateUser(InternalUser user)
        {
            collection!.Update(user);
        }
    }
}