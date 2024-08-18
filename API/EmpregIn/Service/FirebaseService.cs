using FirebaseAdmin.Auth;
using FirebaseAdmin;
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;

namespace EmpregIn.Service
{
    public class FirebaseService
    {
        private readonly FirestoreDb _firestoreDb;

        public FirebaseService()
        {
            string pathToServiceAccountKey = @"C:/Credencial/empregin-c82cb-firebase-adminsdk-t6hdk-b9d5c899d9.json";

            try
            {
                FirebaseApp.Create(new AppOptions
                {
                    Credential = GoogleCredential.FromFile(pathToServiceAccountKey),
                });
                _firestoreDb = FirestoreDb.Create("empregin-c82cb");
                Console.WriteLine("Firebase inicializado com sucesso.");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FirestoreDb GetFirestoreDb() => _firestoreDb;

        public async Task<UserRecord> GetUserAsync(string uid)
        {
            return await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
        }
    }
}
