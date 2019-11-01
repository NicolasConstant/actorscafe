using System;
using System.Collections.Generic;

namespace ActorsCafe
{
    public class User
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

        /// <summary>
        /// フォロワー数を取得または設定します。
        /// </summary>
        public int FollowersCount { get; set; } = 0;

        /// <summary>
        /// フォロー数を取得または設定します。
        /// </summary>
        public int FollowingsCount { get; set; } = 0;

        /// <summary>
        /// 投稿数を取得または設定します。
        /// </summary>
        public int PostsCount { get; set; } = 0;

        /// <summary>
        /// この <see cref="User"/> が作成された日時を取得または設定します。
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// この <see cref="User"/> の情報がアップデートされた日時を取得または設定します。
        /// </summary>
        public DateTime UpdatedAt { get; set; }

        /// <summary>
        /// この <see cref="User"/> が凍結されているかどうか示す値を取得または設定します。
        /// </summary>
        public bool IsFreezed { get; set; }

        /// <summary>
        /// この <see cref="User"/> が非公開ユーザーであるかどうか示す値を取得または設定します。
        /// </summary>
        public bool IsLocked { get; set; }

        /// <summary>
        /// この <see cref="User"/> が Bot アカウントであるかどうか示す値を取得または設定します。
        /// </summary>
        public bool IsBot { get; set; }

        /// <summary>
        /// この <see cref="User"/> が Cat アカウント (発言が猫っぽくなる)かどうか示す値を取得または設定します。
        /// </summary>
        public bool IsCat { get; set; }

        /// <summary>
        /// この <see cref="User"/> が管理者であるかどうか示す値を取得または設定します。
        /// </summary>
        public bool IsAdmin { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> がモデレーターであるかどうか示す値を取得または設定します。
        /// </summary>
        public bool IsModerator { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> が自分をブロックしているかどうかを示す値を取得または設定します。
        /// </summary>
        public bool? IsBlockingMe { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> が自分にブロックされているかどうかを示す値を取得または設定します。
        /// </summary>
        public bool? IsBlocked { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> が自分にミュートされているかどうかを示す値を取得または設定します。
        /// </summary>
        public bool? IsMuted { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> が自分をフォローしているかどうかを示す値を取得または設定します。
        /// </summary>
        public bool? IsFollowingMe { get; set; }
        
        /// <summary>
        /// この <see cref="User"/> が自分にフォローされているかどうかを示す値を取得または設定します。
        /// </summary>
        public bool? IsFollowed { get; set; }

        /// <summary>
        /// この <see cref="User"/> の所属するホストアドレスを取得または設定します。空文字列であればローカルユーザーです。
        /// </summary>
        public string? Host { get; set; }
    }
}