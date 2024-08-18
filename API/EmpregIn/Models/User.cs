namespace EmpregIn.Models
{
    public class User
    {
        public string Uid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Connections { get; set; }
        public List<string> SkillsTags { get; set; }
    }

}
