using EmpregIn.Models;

namespace EmpregIn.Mapper
{
    public class MapperObjects
    {
        public static List<User> ConvertMapToUsers(List<Dictionary<string, object>> maps)
        {
            var usersList = new List<User>();

            if (maps != null)
            {
                foreach (var map in maps)
                {
                    var skillTags = ((List<object>)map["skills_tags"])
                            .Select(skill => skill.ToString())
                            .ToList();

                    usersList.Add(new User
                    {
                        Id = map["id"].ToString(),
                        Skills_Tags = skillTags
                    });
                }
            }

            return usersList;
        }

        public static List<Experiencia> ConvertMapToExperiencia(List<Dictionary<string, object>> maps)
        {
            var experienceList = new List<Experiencia>();

            if (maps != null)
            {
                foreach (var map in maps)
                {
                    experienceList.Add(new Experiencia
                    {
                        CompanyName = map["companyName"].ToString(),
                        Description = map["description"].ToString(),
                        ImageUrl = map["imageUrl"].ToString(),
                        JobTitle = map["jobTitle"].ToString(),
                        Period = map["period"].ToString(),
                    });
                }
            }

            return experienceList;
        }

        public static List<Formacao> ConvertMapToFormacao(List<Dictionary<string, object>> maps)
        {
            var formacaoList = new List<Formacao>();

            if (maps != null)
            {
                foreach (var map in maps)
                {
                    formacaoList.Add(new Formacao
                    {
                        FormationName = map["formationName"].ToString(),
                        ImageUrl = map["imageUrl"].ToString(),
                        InstituteTitle = map["instituteTitle"].ToString(),
                        Period = map["periodo"].ToString()
                    });
                }
            }

            return formacaoList;
        }

        public static List<Hability> ConvertMapToHability(List<Dictionary<string, object>> maps)
        {
            var habilityList = new List<Hability>();

            if (maps != null)
            {
                foreach (var map in maps)
                {
                    habilityList.Add(new Hability
                    {
                        Proficiency = map["proficiency"].ToString(),
                        SkillName = map["skillName"].ToString()
                    });
                }
            }

            return habilityList;
        }

        public static List<Project> ConvertMapToProject(List<Dictionary<string, object>> maps)
        {
            var projectList = new List<Project>();

            if (maps != null)
            {
                foreach (var map in maps)
                {
                    projectList.Add(new Project
                    {
                        Description = map["description"].ToString(),
                        ImageUrl = map["imageUrl"].ToString(),
                        Name = map["projectName"].ToString()
                    });
                }
            }

            return projectList;
        }
    }
}
