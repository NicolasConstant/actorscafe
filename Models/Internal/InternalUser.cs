namespace ActorsCafe
{
    /// <summary>
    /// ユーザーを定義します。
    /// </summary>
    public class InternalUser : User
    {
        public string Password { get; set; } = "";

        public string Token { get; set; } = "";

        public User Pack()
        {
            return new User
            {
                Id = Id,
                Name = Name,
                Description = Description,
                ProfileName = ProfileName,
                AvatarUrl = AvatarUrl,
                FollowersCount = FollowersCount,
                FollowingsCount = FollowingsCount,
                PostsCount = PostsCount,
                CreatedAt = CreatedAt,
                UpdatedAt = UpdatedAt,
                IsFreezed = IsFreezed,
                IsLocked = IsLocked,
                IsBot = IsBot,
                IsCat = IsCat,
                IsAdmin = IsAdmin,
                IsModerator = IsModerator,
                Host = Host,
            };
        }
    }
}