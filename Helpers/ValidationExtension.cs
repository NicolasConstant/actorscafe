using System.Text.RegularExpressions;

namespace ActorsCafe
{
    public static class ValidationExtension
    {
        public static bool IsValidUserName(this string str) => Regex.IsMatch(str, "^[A-Za-z_][A-Za-z0-9_]*$");
    }
}