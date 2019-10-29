using System;
using System.Collections.Generic;
using System.Linq;
using LiteDB;

namespace ActorsCafe
{
    public class UserManager : IDisposable
    {
        public UserManager()
        {
            (db, users) = GetRepository();
        }

        public User CreateNewUser(string name, string hash)
        {
            if (users!.Exists(f => f.Name.ToLowerInvariant() == name.ToLowerInvariant()))
                throw new ArgumentException("already exists");
            var ts = DateTime.Now;
            var u = new User
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

        public User Show(string? id = null, string? name = null, string? host = null)
        {
            if (id != null)
            {
                return users!.FindById(id);
            }
            else if (name != null)
            {
                return users!.FindOne(u => u.Name == name && u.Host == host);
            }
            else
            {
                throw new ArgumentException("Please specify ID or name.");
            }
        }

        public User Show(string token)
        {
            return users!.FindOne(u => u.Token == token);
        }

        public IEnumerable<User> EnumerateAll()
        {
            return users!.FindAll();
        }

        private (LiteDatabase, LiteCollection<User>) GetRepository()
        {
            var db = Server.GetDatabase();
            var c = db.GetCollection<User>("users");
            c.EnsureIndex(u => u.Id, true);
            return (db, c);
        }

        public void Dispose()
        {
            ((IDisposable)db!).Dispose();
        }

        private LiteDatabase? db;
        private LiteCollection<User>? users;
    }
}