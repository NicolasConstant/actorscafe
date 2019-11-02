using System;
using System.IO;
using LiteDB;

namespace ActorsCafe
{
    public class Server : IDisposable
    {
        public UserManager UserManager { get; } = new UserManager();

        public PostManager PostManager { get; } = new PostManager();

        public static Server I { get; } = new Server();

        public static LiteDatabase DatabaseRef => dbRef != null ? dbRef : dbRef = new LiteDatabase("filename=./database.db;mode=Exclusive");

        public string Version { get; } = "pre-alpha191102";
        
        public string CodeName { get; } = "Apple Pie";

        public string? TermsOfService { get; } = File.Exists("./tos.md") ? File.ReadAllText("./tos.md") : null;

        public string? Description { get; } = File.Exists("./description.md") ? File.ReadAllText("./description.md") : null;

        public void Dispose()
        {
            DatabaseRef?.Dispose();
        }

        // avoid instantiate
        private Server() {
            BsonMapper.Global.EmptyStringToNull = false;
        }

        private static LiteDatabase? dbRef;
    }
}