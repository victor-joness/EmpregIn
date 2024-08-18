using EmpregIn.Models;

namespace EmpregIn.Service
{
    public class BfsService
    {
        public int GetMinimumDistance(User startUser, User targetUser, Dictionary<string, User> allUsers)
        {
            var queue = new Queue<User>();
            var visited = new HashSet<string>();
            queue.Enqueue(startUser);
            visited.Add(startUser.Uid);
            int steps = 0;

            while (queue.Count > 0)
            {
                int levelSize = queue.Count;
                for (int i = 0; i < levelSize; i++)
                {
                    var currentUser = queue.Dequeue();

                    if (currentUser.Uid == targetUser.Uid)
                    {
                        return steps;
                    }

                    foreach (var connectionId in currentUser.SkillsTags)  // Considerando SkillsTags como conexões para este exemplo
                    {
                        if (!visited.Contains(connectionId) && allUsers.ContainsKey(connectionId))
                        {
                            queue.Enqueue(allUsers[connectionId]);
                            visited.Add(connectionId);
                        }
                    }
                }
                steps++;
            }

            return -1;
        }
    }

}
