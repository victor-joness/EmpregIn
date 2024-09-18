namespace EmpregIn.Models
{
    public class User
    {
        public string Id { get; set; }
        public string CurrentPosition { get; set; }
        public string Description { get; set; }
        public string Locality { get; set; }
        public string PhotoURL { get; set; }
        public string Qualification { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<User> Connections { get; set; }
        public List<User> ConnectionsReceived { get; set; }
        public List<User> ConnectionsSend { get; set; }
        public List<string> Skills_Tags { get; set; }
    }

}
