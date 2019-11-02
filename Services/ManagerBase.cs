using LiteDB;

namespace ActorsCafe
{
    public abstract class ManagerBase<T> where T : IEntity
    {
        public ManagerBase()
        {
            (db, collection) = GetRepository();
        }

        public abstract string CollectionName { get; }

        private (LiteDatabase, LiteCollection<T>) GetRepository()
        {
            var db = Server.DatabaseRef;
            var c = db.GetCollection<T>(CollectionName);
            c.EnsureIndex(u => u.Id, true);
            return (db, c);
        }

        protected LiteDatabase? db;
        protected LiteCollection<T>? collection;
    }
}