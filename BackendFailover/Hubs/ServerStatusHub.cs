using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using BackendFailover.Services;

namespace BackendFailover.Hubs
{
    public class ServerStatusHub : Hub
    {
        private readonly DatabaseFailoverService _failoverService;

        public ServerStatusHub(DatabaseFailoverService failoverService)
        {
            _failoverService = failoverService;
        }

        public async Task GetCurrentServerStatus()
        {
            var serverInfo = _failoverService.GetCurrentServerInfo();
            await Clients.Caller.SendAsync("ServerStatusChanged", serverInfo);
        }
    }
}
