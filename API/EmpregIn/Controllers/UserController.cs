using EmpregIn.Models;
using EmpregIn.Service;
using EmpregIn.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace EmpregIn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public UserController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpGet("busca")]
        public async Task<IActionResult> GetUsersBySkillsTags(string idUsuarioLogado)
        {
            try
            {
                var usuariosRecomendados = await GetUsuariosRecomendados(idUsuarioLogado);

                if (usuariosRecomendados.Count == 0)
                {
                    return NotFound("Nenhum usuário recomendado encontrado.");
                }

                return Ok(usuariosRecomendados);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        private async Task<List<User>> GetUsuariosRecomendados(string idUsuarioLogado)
        {
            var allUsers = await LoadAllUsersFromFirebase();

            if (!allUsers.ContainsKey(idUsuarioLogado))
            {
                throw new Exception("Usuário logado não encontrado.");
            }

            var usuarioLogado = allUsers[idUsuarioLogado];
            var usuariosConectados = usuarioLogado.Connections.Select(u => u.Id).ToHashSet();
            var usuariosConexaoRecebida = usuarioLogado.ConnectionsReceived.Select(u => u.Id).ToHashSet();
            var usuariosConexaoEnviada = usuarioLogado.ConnectionsSend.Select(u => u.Id).ToHashSet();


            var usuariosRecomendados = allUsers.Values
                .Where(user => user.Id != idUsuarioLogado && !usuariosConectados.Contains(user.Id) && !usuariosConexaoRecebida.Contains(user.Id) && !usuariosConexaoEnviada.Contains(user.Id)) 
                .Select(user => new
                {
                    User = user,
                    MatchingSkills = CarcularProximidadePorSkillsTags(user, usuarioLogado)
                })
                .OrderByDescending(u => u.MatchingSkills)
                .Select(u => u.User)
                .ToList();

            return usuariosRecomendados;
        }


        private async Task<Dictionary<string, User>> LoadAllUsersFromFirebase()
        {
            var usersDict = new Dictionary<string, User>();

            var db = _firebaseService.GetFirestoreDb();
            var usersRef = db.Collection("users");

            var snapshot = await usersRef.GetSnapshotAsync();

            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var connectionsMap = document.GetValue<List<Dictionary<string, object>>>("connections");
                    var connectionsReceivedMap = document.GetValue<List<Dictionary<string, object>>>("connections_received");
                    var connectionsSendMap = document.GetValue<List<Dictionary<string, object>>>("connections_send");
                    var educationMap = document.GetValue<List<Dictionary<string, object>>>("education");
                    var experienceMap = document.GetValue<List<Dictionary<string, object>>>("experience");
                    var habilityMap = document.GetValue<List<Dictionary<string, object>>>("hability");
                    var projectsMap = document.GetValue<List<Dictionary<string, object>>>("projects");

                    User user = new User
                    {
                        Connections = MapperObjects.ConvertMapToUsers(connectionsMap),
                        ConnectionsReceived = MapperObjects.ConvertMapToUsers(connectionsReceivedMap),
                        ConnectionsSend = MapperObjects.ConvertMapToUsers(connectionsSendMap),
                        CurrentPosition = document.ContainsField("current_position") ? document.GetValue<string>("current_position") : null,
                        Description = document.ContainsField("description") ? document.GetValue<string>("description") : null,
                        Education = MapperObjects.ConvertMapToFormacao(educationMap),
                        Experience = MapperObjects.ConvertMapToExperiencia(experienceMap),
                        Hability = MapperObjects.ConvertMapToHability(habilityMap),
                        Email = document.ContainsField("email") ? document.GetValue<string>("email") : null,
                        Id = document.Id,
                        Locality = document.ContainsField("locality") ? document.GetValue<string>("locality") : null,
                        Name = document.ContainsField("name") ? document.GetValue<string>("name") : null,
                        PhotoBanner = document.ContainsField("photoBanner") ? document.GetValue<string>("photoBanner") : null,
                        PhotoURL = document.ContainsField("photoURL") ? document.GetValue<string>("photoURL") : null,
                        Proficiency = document.ContainsField("proficiency") ? document.GetValue<string>("proficiency") : null,
                        Projects = MapperObjects.ConvertMapToProject(projectsMap),
                        Qualification = document.ContainsField("qualification") ? document.GetValue<string>("qualification") : null,
                        Skills_Tags = document.ContainsField("skills_tags") ? document.GetValue<List<string>>("skills_tags") : new List<string>()
                    };

                    usersDict[document.Id] = user;
                }
            }

            return usersDict;
        }
        private int CarcularProximidadePorSkillsTags(User user, User loggedInUser)
        {
            var qtdSkillsIguais = user.Skills_Tags.Intersect(loggedInUser.Skills_Tags).Count();
            return qtdSkillsIguais;
        }
    }
}
