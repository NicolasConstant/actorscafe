using System;
using Base62;

namespace ActorsCafe
{
    public static class UniqueId
    {
        public static string Generate()
        {
            var guid = Guid.NewGuid().ToByteArray();
            var long1 = BitConverter.ToUInt64(guid.AsSpan(0, 8));
            var long2 = BitConverter.ToUInt64(guid.AsSpan(8));
            return $"{long1.ToString62()}-{long2.ToString62()}";
        }
    }
}