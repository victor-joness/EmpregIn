namespace EmpregIn.Models
{
    public class User
    {
        public List<User> Connections { get; set; }
        public List<User> ConnectionsReceived { get; set; }
        public List<User> ConnectionsSend { get; set; }
        /*CreationDate*/
        public string CurrentPosition { get; set; }
        public string Description { get; set; }
        public List<Formacao> Education { get; set; }
        public string Email { get; set; }
        public List<Experiencia> Experience { get; set; }
        public List<Hability> Hability { get; set; }
        public string Id { get; set; }
        public string Locality { get; set; }
        public string Name { get; set; }
        public string PhotoBanner { get; set; }
        public string PhotoURL { get; set; }
        public string Proficiency { get; set; }
        public List<Project> Projects { get; set; }
        public string Qualification { get; set; }
        public List<string> Skills_Tags { get; set; }


    }

}
