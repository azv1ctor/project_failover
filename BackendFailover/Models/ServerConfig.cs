namespace BackendFailover.Models 
{
    public class ServerConfig 
    {
        public string ServerName {get; set;}
        public string IPAddress {get; set;}
        public int Port {get; set;}
        public string DatabaseName {get; set;}
        public string Username {get; set;}
        public string Password {get; set;}
        public bool IsPrimary {get; set;}
    }
}