using EmpregIn.Models;
using EmpregIn.Service;
using Microsoft.AspNetCore.Mvc;

namespace EmpregIn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;
        private readonly BfsService _bfsService;

        public UserController(FirebaseService firebaseService, BfsService bfsService)
        {
            _firebaseService = firebaseService;
            _bfsService = bfsService;
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
            var usuariosConectados = usuarioLogado.Connections.Select(u => u.Uid).ToHashSet();

            var usuariosRecomendados = allUsers.Values
                .Where(user => user.Uid != idUsuarioLogado && !usuariosConectados.Contains(user.Uid)) 
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

                    User user = new User
                    {
                        Connections = ConvertMapToUsers(connectionsMap),
                        ConnectionsReceived = ConvertMapToUsers(connectionsReceivedMap),
                        ConnectionsSend = ConvertMapToUsers(connectionsSendMap),
                        CurrentPosition = document.GetValue<string>("current_position"),
                        Description = document.GetValue<string>("description"),
                        Email = document.GetValue<string>("email"),
                        Uid = document.Id,
                        Locality = document.GetValue<string>("locality"),
                        Name = document.GetValue<string>("name"),
                        PhotoURL = document.GetValue<string>("photoURL"),
                        Qualification = document.GetValue<string>("qualification"),
                        SkillsTags = document.GetValue<List<string>>("skills_tags")
                    };

                    usersDict[document.Id] = user;
                }
            }

            return usersDict;
        }
        private int CarcularProximidadePorSkillsTags(User user, User loggedInUser)
        {
            var qtdSkillsIguais = user.SkillsTags.Intersect(loggedInUser.SkillsTags).Count();
            return qtdSkillsIguais;
        }

        private List<User> ConvertMapToUsers(List<Dictionary<string, object>> maps)
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
                        Uid = map["id"].ToString(),
                        SkillsTags = skillTags,
                    });
                }
            }

            return usersList;
        }
    }
}
