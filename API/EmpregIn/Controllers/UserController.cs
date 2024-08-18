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

            // Itera sobre cada documento na coleção "users"
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    // Mapeia os dados do documento para o modelo User
                    var user = new User
                    {
                        Uid = document.Id,
                        Name = document.GetValue<string>("name"),
                        Email = document.GetValue<string>("email"),
                        Connections = document.GetValue<int>("connections"),
                        SkillsTags = document.GetValue<List<string>>("skills_tags"),
                        // Adicione os outros campos conforme necessário
                    };

                    // Adiciona o usuário ao dicionário
                    usersDict[document.Id] = user;
                }
            }

            // Retorna o dicionário de usuários
            return usersDict;
        }
    }


}
