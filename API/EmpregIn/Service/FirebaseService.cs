﻿using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;

namespace EmpregIn.Service
{
    public class FirebaseService
    {
        private readonly FirestoreDb _firestoreDb;

        public FirebaseService()
        {
            try
            {
                _firestoreDb = FirestoreDb.Create("empregin-c82cb");
                Console.WriteLine("Firebase inicializado com sucesso.");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FirestoreDb GetFirestoreDb() => _firestoreDb;
    }
}
