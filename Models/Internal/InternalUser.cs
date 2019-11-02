using System.Collections.Generic;

namespace ActorsCafe.Internal
{
    /// <summary>
    /// ユーザーを定義します。
    /// </summary>
    public class InternalUser : User, IEntity
    {
        public string Password { get; set; } = "";

        public string Token { get; set; } = "";

        public User Pack(InternalUser? me = null)
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
                IsBlocked = false,
                IsBlockingMe = false,
                IsMuted = false,
                IsFollowed = me != null ? Server.I.FollowingManager.IsFollowing(me, this) : false,
                IsFollowingMe = me != null ? Server.I.FollowingManager.IsFollowing(this, me) : false,
            };
        }
    }
}