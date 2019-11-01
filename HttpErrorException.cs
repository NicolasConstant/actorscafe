using System;

namespace ActorsCafe.Endpoints
{
    [Serializable]
    public class HttpErrorException : Exception
    {
        public int Status { get; }
        public HttpErrorException(int status, string message) : base(message) => Status = status;
    }
}
