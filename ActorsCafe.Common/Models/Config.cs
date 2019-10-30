using System.IO;
using Newtonsoft.Json;

namespace ActorsCafe
{
    public class Config
    {
        public static Config I { get; } = LoadConfig();

        public string ApiHost { get; set; } = "localhost:4443";

        private Config()
        { }

        private static Config LoadConfig()
        {
            if (File.Exists("config.json"))
                return JsonConvert.DeserializeObject<Config>(File.ReadAllText("config.json"));
            else
            {
                var c = new Config();
                File.WriteAllText("config.json", JsonConvert.SerializeObject(c));
                return c;
            }
        }
    }
}