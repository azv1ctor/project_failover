using Microsoft.AspNetCore.Mvc;
using BackendFailover.Services;
using MySql.Data.MySqlClient;

namespace BackendFailover.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly DatabaseFailoverService _failoverService;

        public TestController(DatabaseFailoverService failoverService)
        {
            _failoverService = failoverService;
        }

        [HttpGet("GetDateTime")]
        public IActionResult GetDateTime()
        {
            var connectionString = _failoverService.GetCurrentConnectionString();

            try
            {
                using (var connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    var command = new MySqlCommand("SELECT NOW();", connection);
                    var result =  command.ExecuteScalar();

                    connection.Close();

                    return Ok(new { DateTime = result.ToString() });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao acessar o banco de dados: " + ex.Message);
                return StatusCode(500, "Erro ao acessar o banco de dados.");
            }
        }
    }
}