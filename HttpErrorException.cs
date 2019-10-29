using System;

namespace ActorsCafe.Endpoints
{
    [Serializable]
    public class HttpErrorException : Exception
    {
        public HttpErrorException(int status, string message) : base(message) { }
    }
}
