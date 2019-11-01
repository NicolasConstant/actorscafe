using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActorsCafe.Endpoints
{
    [ApiController]
    public abstract class ApiController : Controller
    {
        public Server Server => Server.I;

        public UserManager Users => Server.I.UserManager;

        public virtual bool IsConfidential => false;

        [HttpPost]
        public IActionResult Post([FromBody] JObject param)
        {
            try
            {
                string? token = GetOptional<string>(param, "token");
                if (IsConfidential && token == null)
                {
                    return Error(401, "Not authorized");
                }
                return Json(Handle(param, token ?? ""));
            }
            catch (HttpErrorException ex)
            {
                return Error(ex.Status, ex.Message);
            }
            catch (Exception ex)
            {
                return Error(500, ex.Message, ex.StackTrace ?? "", ex.GetType().Name);
            }
        }

        public ObjectResult Error(int status, string error)
        {
            return StatusCode(status, new
            {
                Status = status,
                Message = error,
            });
        }

        public ObjectResult Error(int status, string error, string stackTrace, string typeName)
        {
            return StatusCode(status, new
            {
                Status = status,
                Message = error,
                StackTrace = stackTrace,
                type = typeName,
            });
        }

        public T GetRequired<T>(JObject obj, string key) where T : class
        {
            return GetOptional<T>(obj, key) ?? throw new HttpErrorException(400, $"{key} required");
        }

        public T? GetOptional<T>(JObject obj, string key) where T : class
        {
            obj.TryGetValue(key, out var res);
            return res?.ToObject<T>();
        }

        public abstract object Handle(JObject param, string token);
    }
}
