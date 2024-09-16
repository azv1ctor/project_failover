using Microsoft.AspNetCore.Mvc;
using BackendFailover.Models;
using System.Collections.Generic;

namespace BackendFailover.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerConfigController : ControllerBase
    {
        private static List<ServerConfig> serverConfigs = new List<ServerConfig>();

        [HttpGet]
        public IEnumerable<ServerConfig> Get()
        {
            return serverConfigs;
        }

        [HttpPost]
        public IActionResult Post([FromBody] ServerConfig config)
        {
            serverConfigs.Add(config);
            return Ok();
        }
    }
}