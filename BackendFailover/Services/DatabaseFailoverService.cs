using System;
using System.Threading;
using System.Threading.Tasks;
using BackendFailover.Hubs;
using BackendFailover.Models;
using Microsoft.AspNetCore.SignalR;
using MySql.Data.MySqlClient;

namespace BackendFailover.Services
{
    public class DatabaseFailoverService
    {
        private ServerConfig _primaryServer;
        private ServerConfig _secondaryServer;
        private Timer _timer;
        private bool _isUsingSecondary;
        private readonly IHubContext<ServerStatusHub> _hubContext;

        public DatabaseFailoverService(IHubContext<ServerStatusHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public void Initialize(ServerConfig primary, ServerConfig secondary)
        {
            _primaryServer = primary;
            _secondaryServer = secondary;
            _isUsingSecondary = false;

            if (_timer == null)
            {
                _timer = new Timer(CheckPrimaryServer, null, 0, 5000);
            }
            else
            {
                _timer.Change(0, 5000);
            }
        }

        private void CheckPrimaryServer(object state)
        {
            Console.WriteLine("Verificando disponibilidade do servidor primário...");

            if (IsServerAvailable(_primaryServer))
            {
                if (_isUsingSecondary)
                {
                    _isUsingSecondary = false;
                    Console.WriteLine("Retornando ao servidor primário.");

                    _hubContext.Clients.All.SendAsync("ServerStatusChanged", GetCurrentServerInfo());
                }
                else
                {
                    Console.WriteLine("Servidor primário disponível e em uso.");
                }
            }
            else
            {
                Console.WriteLine("Servidor primário indisponível.");

                if (!_isUsingSecondary)
                {
                    _isUsingSecondary = true;
                    Console.WriteLine("Alternando para o servidor secundário.");

                    _hubContext.Clients.All.SendAsync("ServerStatusChanged", GetCurrentServerInfo());
                }
                else
                {
                    Console.WriteLine("Servidor secundário já está em uso.");
                }
            }
        }


        private bool IsServerAvailable(ServerConfig server)
        {
            try
            {
                Console.WriteLine($"Tentando conectar ao servidor: {server.ServerName} ({server.IPAddress}:{server.Port})");

                using (var connection = new MySqlConnection(GetConnectionString(server)))
                {
                    connection.Open();
                    connection.Close();
                    Console.WriteLine("Conexão bem-sucedida");
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Falha ao conectar: {ex.Message}");
                return false;
            }
        }

        private string GetConnectionString(ServerConfig server)
        {
            return $"Server={server.IPAddress};Port={server.Port};Database={server.DatabaseName};Uid={server.Username};Pwd={server.Password};";
        }

        public string GetCurrentConnectionString()
        {
            return _isUsingSecondary ? GetConnectionString(_secondaryServer) : GetConnectionString(_primaryServer);
        }

        public ServerConfig GetCurrentServerInfo()
        {
            return _isUsingSecondary ? _secondaryServer : _primaryServer;
        }
    }
}
