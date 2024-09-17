using Microsoft.AspNetCore.Mvc;
using BackendFailover.Models;
using System.Collections.Generic;
using System.Linq;
using BackendFailover.Services;

namespace BackendFailover.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerConfigController : ControllerBase
    {
        private readonly DatabaseFailoverService _failoverService;

        public ServerConfigController(DatabaseFailoverService failoverService)
        {
            _failoverService = failoverService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { CurrentServer = _failoverService.GetCurrentServerInfo() });
        }

        [HttpPost]
        public IActionResult Post([FromBody] ServerConfig[] configs)
        {
            Console.WriteLine("Recebedno configurações dos servidores");
            if (configs.Length != 2)
            {
                return BadRequest("São necessárias duas configurações de servidor.");
            }

            var primaryServer = configs.FirstOrDefault(s => s.IsPrimary);
            var secondaryServer = configs.FirstOrDefault(s => !s.IsPrimary);

            if (primaryServer == null || secondaryServer == null)
            {
                return BadRequest("Deve haver um servidor primário e um secundário.");
            }
            Console.WriteLine($"Servidor Primário: {primaryServer.ServerName}");
            Console.WriteLine($"Servidor Secundário: {secondaryServer.ServerName}");

            _failoverService.Initialize(primaryServer, secondaryServer);

            return Ok();
        }
    }
}