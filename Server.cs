using System;
using LiteDB;

namespace ActorsCafe
{
    public class Server : IDisposable
    {
        public UserManager UserManager { get; } = new UserManager();

        public PostManager PostManager { get; } = new PostManager();

        public static Server I { get; } = new Server();

        public static LiteDatabase DatabaseRef => dbRef != null ? dbRef : dbRef = new LiteDatabase("filename=./database.db;mode=Exclusive");

        public void Dispose()
        {
            DatabaseRef?.Dispose();
        }

        // avoid instantiate
        private Server() { }

        private static LiteDatabase? dbRef;
    }
}