using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    public abstract class ApiController : Controller
    {
        public Server Server => Server.I;

        public UserManager Users => Server.I.UserManager;

        public ObjectResult Error(int status, string error)
        {
            return StatusCode(status, new
            {
                Status = status,
                Message = error,
            });
        }

        public T GetRequired<T>(JObject obj, string key) where T : class
        {
            return GetOptional<T>(obj, key) ?? throw new ArgumentException($"{key} required");
        }

        public T? GetOptional<T>(JObject obj, string key) where T : class
        {
            obj.TryGetValue(key, out var res);
            return res?.ToObject<T>();
        }
    }
}
