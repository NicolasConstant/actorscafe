namespace ActorsCafe.Internal
{
    public class Following : IEntity
    {
        public string Id { get; set; } = "";

        public string followerId { get; set; } = "";
        public string followeeId { get; set; } = "";
    }
}