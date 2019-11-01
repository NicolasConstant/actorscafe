using System;
using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;
using LiteDB;

namespace ActorsCafe
{
    public class UserManager
    {
        public UserManager()
        {
            (db, users) = GetRepository();
        }

        public InternalUser CreateNewUser(string name, string hash)
        {
            if (users!.Exists(f => f.Name.ToLowerInvariant() == name.ToLowerInvariant()))
                throw new ArgumentException("already exists");
            if (!name.IsValidUserName()) {
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
            users!.Insert(u);
            return u;
        }

        public InternalUser? Show(string? id = null, string? name = null, string? host = null)
        {
            if (id != null)
            {
                return users!.FindById(id);
            }
            else if (name != null)
            {
                return users!.FindOne(u => u.Name.ToLowerInvariant() == name.ToLowerInvariant() && (u.Host ?? "").ToLowerInvariant() == (host ?? "").ToLowerInvariant());
            }
            else
            {
                throw new ArgumentException("Please specify ID or name.");
            }
        }

        public InternalUser Show(string token)
        {
            return users!.FindOne(u => u.Token == token);
        }

        public IEnumerable<InternalUser> EnumerateAll()
        {
            return users!.FindAll();
        }

        private (LiteDatabase, LiteCollection<InternalUser>) GetRepository()
        {
            var db = Server.DatabaseRef;
            var c = db.GetCollection<InternalUser>("users");
            c.EnsureIndex(u => u.Id, true);
            return (db, c);
        }

        private LiteDatabase? db;
        private LiteCollection<InternalUser>? users;
    }
}