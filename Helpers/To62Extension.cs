using System.Text;

namespace ActorsCafe
{
    public static class To62Extension
    {
        public static string ToString62(this ulong value)
        {
            if (value == 0) return "0";
            var builder = new StringBuilder();
            while (value != 0)
            {
                var mod = (int)(value % 62);
                value /= 62;
                builder.Insert(0, Table[mod]);
            }
            return builder.ToString();
        }

        private static readonly string Table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
}