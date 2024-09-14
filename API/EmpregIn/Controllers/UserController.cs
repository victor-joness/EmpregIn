using EmpregIn.Models;
using EmpregIn.Service;
using Google.Cloud.Firestore;
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

        [HttpGet("searchbfs")]
        public async Task<IActionResult> GetDistance(string startUid, string targetUid)
        {
            var allUsers = await LoadAllUsersFromFirebase();

            if (!allUsers.ContainsKey(startUid) || !allUsers.ContainsKey(targetUid))
            {
                return NotFound("Usuário não encontrado.");
            }

            var startUser = allUsers[startUid];
            var targetUser = allUsers[targetUid];

            int distance = _bfsService.GetMinimumDistance(startUser, targetUser, allUsers);

            if (distance == -1)
            {
                return NotFound("Caminho entre os usuários não encontrado.");
            }

            return Ok(new { distance });
        }

        private async Task<Dictionary<string, User>> LoadAllUsersFromFirebase()
        {
            // Cria um dicionário para armazenar os usuários carregados
            var usersDict = new Dictionary<string, User>();

            // Obtém o FirestoreDb do serviço Firebase
            var db = _firebaseService.GetFirestoreDb();
            var usersRef = db.Collection("users");

            // Obtém todos os documentos da coleção "users"
            var snapshot = await usersRef.GetSnapshotAsync();

            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    User user = new User
                    {
                        Connections = document.GetValue<List<User>>("connections"),
                        ConnectionsReceived = document.GetValue<List<User>>("connections_received"),
                        ConnectionsSend = document.GetValue<List<User>>("connections_send"),
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
    }


}
