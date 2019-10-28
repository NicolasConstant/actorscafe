using System;

namespace ActorsCafe
{
    public class UserResponse
    {
        /// <summary>
        /// ユーザーを識別する一意の ID を取得または設定します。
        /// </summary>
        public string Id { get; set; } = "";

        /// <summary>
        /// ユーザーの @ からはじまる名前を取得または設定します。
        /// </summary>
        public string Name { get; set; } = "";

        /// <summary>
        /// ユーザーの説明を取得または設定します。
        /// </summary>
        public string Description { get; set; } = "";

        /// <summary>
        /// ユーザーの表示名を取得または設定します。
        /// </summary>
        public string? ProfileName { get; set; }

        /// <summary>
        /// ユーザー アバターの URL を取得または設定します。
        /// </summary>
        public string? AvatarUrl { get; set; }

        public int FollowersCount { get; set; } = 0;

        public int FollowingsCount { get; set; } = 0;

        public int PostsCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public bool IsFreezed { get; set; }

        public bool IsLocked { get; set; }

        public bool IsBot { get; set; }

        public bool IsCat { get; set; }

        public bool IsAdmin { get; set; }
        
        public bool IsModerator { get; set; }

        public string? Host { get; set; }
    }
}