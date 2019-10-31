using System;
using System.Net.Http;
using System.Threading.Tasks;
using Blazor.Extensions.Storage;
using Microsoft.AspNetCore.Components;

namespace ActorsCafe.Client
{
    /// <summary>
    /// ActorsCafe Operating System. This class cannot be inherited.
    /// </summary>
    public sealed class ActorsOS
    {
        public User User
        {
            get => user;
            set
            {
                user = value;
                UserChanged?.Invoke(user);
            }
        }

        public string Token
        {
            get => token;
            set
            {
                token = value;
                TokenChanged?.Invoke(token);
            }
        }

        public bool IsSignedIn => Token != null;

        public ActorsOS(LocalStorage storage, HttpClient http)
        {
            Storage = storage;
            Http = http;
        }

        public async ValueTask InitializeAsync()
        {
            User = await Storage.GetItem<User>("user");
            Token = await Storage.GetItem<string>("token");
        }

        public async ValueTask SignUpAsync(string name, string pass)
        {    
            var ret = await Http.PostJsonAsync<SignInResponse>("https://localhost:5001/api/signup", new {
                userName = name,
                password = pass,
            });
            await Storage.SetItem<User>("user", User = ret.user);
            await Storage.SetItem<string>("token", Token = ret.token);
        }

        public async ValueTask SignInAsync(string name, string pass)
        {
            var ret = await Http.PostJsonAsync<SignInResponse>("https://localhost:5001/api/signin", new {
                userName = name,
                password = pass,
            });
            await Storage.SetItem<User>("user", User = ret.user);
            await Storage.SetItem<string>("token", Token = ret.token);
        }

        public async ValueTask SignOutAsync()
        {
            await Storage.SetItem<string>("token", Token = null);
            await Storage.SetItem<User>("user", User = null);
        }

        public event Action<string> TokenChanged;

        public event Action<User> UserChanged;

        private LocalStorage Storage { get; set; }

        private HttpClient Http { get; set; }

        private string token;

        private User user;

        class SignInResponse
        {
            public string token { get; set; }
            public User user { get; set; }
        }
    }
}