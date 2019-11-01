using System;
using LiteDB;

namespace ActorsCafe
{
    public class Server : IDisposable
    {
        public UserManager UserManager { get; } = new UserManager();

        public PostManager PostManager { get; } = new PostManager();

        public static Server I { get; } = new Server();

        public static LiteDatabase GetDatabase() => new LiteDatabase("filename=./database.db;mode=Exclusive");

        public void Dispose()
        {
            UserManager.Dispose();
        }

        // avoid instantiate
        private Server() { }
    }
}