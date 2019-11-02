using System;
using System.Collections.Generic;
using System.Linq;
using ActorsCafe.Internal;

namespace ActorsCafe
{
    public class FollowingManager : ManagerBase<Following>
    {
        public override string CollectionName => "following";

        public void Create(InternalUser me, InternalUser followee)
        {
            var id = $"{me.Id}-{followee.Id}";
            if (IsFollowing(me, followee)) throw new ArgumentException("Already following");
            collection!.Insert(new Following{
                Id = id,
                followerId = me.Id,
                followeeId = followee.Id,
            });

            Server.I.UserManager.IncrementFollowingsCount(me);
            Server.I.UserManager.IncrementFollowersCount(followee);
        }

        public void Delete(InternalUser me, InternalUser followee)
        {
            var id = $"{me.Id}-{followee.Id}";
            if (!IsFollowing(me, followee)) throw new ArgumentException("Not following");
            collection!.Delete(id);
            Server.I.UserManager.IncrementFollowingsCount(me, -1);
            Server.I.UserManager.IncrementFollowersCount(followee, -1);
        }

        public bool IsFollowing(User follower, User followee)
        {
            return collection!.Exists(f => f.followerId == follower.Id && f.followeeId == followee.Id);
        }

        public IEnumerable<string> GetFollowings(string userId, int offset = 0, int limit = int.MaxValue)
        {
            return collection!.Find(f => f.followerId == userId, offset, limit).Select(f => f.followeeId);
        }

        public IEnumerable<string> GetFollowers(string userId, int offset = 0, int limit = int.MaxValue)
        {
            return collection!.Find(f => f.followeeId == userId, offset, limit).Select(f => f.followerId);
        }
    }
}