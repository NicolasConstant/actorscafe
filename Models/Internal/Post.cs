using System;

namespace ActorsCafe
{
    public class Post
    {
        public const string VISIBILITY_PUBLIC = "public";
        public const string VISIBILITY_FOLLOWERS = "followers";
        public const string VISIBILITY_DIRECT = "direct";

        public string Id { get; set; } = "";

        public string UserId { get; set; } = "";

        public string? Text { get; set; }

        public string? Cw { get; set; }

        public string Visibility { get; set; } = VISIBILITY_PUBLIC;

        public DateTime CreatedAt { get; set; }

        public int RepostCount { get; set; }

        public bool IsLocalOnly { get; set; }

        public string? RepostId { get; set; }

        public string? ReplyId { get; set; }
    }
}