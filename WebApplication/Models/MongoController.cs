using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace WebApplication1.Models
{
    public class MongoController
    {
      
        IMongoDatabase database; // база данных
        IGridFSBucket gridFS;   // файловое хранилище
        private object stringbuilder;
        public MongoController()
        {           
            string connectionString = "mongodb://Quizer:12345678k@quizerdata-shard-00-00-xju83.mongodb.net:27017,quizerdata-shard-00-01-xju83.mongodb.net:27017,quizerdata-shard-00-02-xju83.mongodb.net:27017/test?ssl=true&replicaSet=QuizerData-shard-0&authSource=admin&retryWrites=true";  //"mongodb://localhost:27017/Quiz";            

            string databas = "Quiz";

            MongoClient client = new MongoClient(connectionString);
            
            database = client.GetDatabase(databas);
                            
            gridFS = new GridFSBucket(database);
        }

        private IMongoCollection<User> Users
        {
            get { return database.GetCollection<User>("Users"); }
        }
        private IMongoCollection<Quiz> Quizes
        {
            get { return database.GetCollection<Quiz>("Quizes"); }
        }
        private IMongoCollection<QuizStats> QuizStat
        {
            get { return database.GetCollection<QuizStats>("Users"); }
        }
        private IMongoCollection<AdminKey> AdminKeys
        {
            get { return database.GetCollection<AdminKey>("AdminsKeys"); }
        }
        private IMongoCollection<TestResult> TestsResult
        {
            get { return database.GetCollection<TestResult>("TestsResult"); }
        }



        public  User LogIn(string name)
        {
            var builder = new FilterDefinitionBuilder<User>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("Login", new BsonRegularExpression(name));
            return  Users.Find(filter).FirstOrDefault();
        }

        public async Task<User> GetPhone(string id)
        {
            return await Users.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }
        
        public  List<Quiz> GetQuiz()
        {
            var builder = new FilterDefinitionBuilder<Quiz>();
            var filter = builder.Empty; // фильтр для выборки всех документов            
            return  Quizes.Find(filter).ToList();
        }

        public List<Quiz> GetQuiz(string id)
        {
            var builder = new FilterDefinitionBuilder<Quiz>();
            var filter = builder.Empty; // фильтр для выборки всех документов            
            return Quizes.Find(k => k.UserAccount.Id == id).ToList();
        }





        public Quiz GetQuizById(string id)
        {
            return Quizes.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefault();
        }


        public void AddTestResult(TestResult test)
        {
            TestsResult.InsertOne(test);
        }
        public List<TestResult> GetTestResult(string testId)
        {           
            return TestsResult.Find(new BsonDocument("QuizId", testId)).ToList();
        }

        public List<TestResult> GetTestResultByUser(string userId)
        {
            return TestsResult.Find(k=> k.UserTest.Id == userId).ToList();
        }

        public void UpdateQuiz(string id,Quiz quiz)
        {
            quiz.Id = id;
            var res = Quizes.FindOneAndReplace<Quiz>(k=>k.Id==id, quiz);
        }

        public async Task addQuiz(Quiz q)
        {
            await Quizes.InsertOneAsync(q);
        }

        public async Task AddQuizStats(QuizStats p)
        {
            await QuizStat.InsertOneAsync(p);
        }

        public double[] GetStatsOfQuestion(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id ) ).ToList();

            try
            {
                double[] ans = new double[ls.First().answerssmap.Length];
                int counter = 0;

                for (int i = 0; i < ls[0].answerssmap.Length; i++)
                {
                    ans[i] = 0;
                }

                foreach (var pt in ls)
                {
                    pt.answerssmap.ToList().ForEach(k =>
                    {
                        if (k.answer >= 0)
                        {
                            ans[counter] += 1;
                        }
                        counter++;
                    });
                    counter = 0;
                }

                for (int i = 0; i < ls[0].answerssmap.Length; i++)
                {
                    ans[i] = ans[i] / ls.Count * 100;
                }

                return ans;
            }
            catch
            {
                double[] zeros = { 0, 0, 0, 0, 0, 0 };
                return zeros;
            }
        }


        public Array GetStatsQ(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();

            var Qwes  = new List<List<int>>();
            var buf = new List<int>();
            try
            {
                for (int i = 0; i < ls.First().answerssmap.Length; i++)
                {

                    buf = new List<int>();

                    foreach (var pt4 in ls.First().answerssmap[i].answers)
                    {
                        buf.Add(0);
                    }
                    Qwes.Add(buf);
                }

                int counter = 0;


                foreach (var pt in ls)
                {
                    foreach (var pt2 in pt.answerssmap)
                    {
                        for (int i = 0; i < pt2.answers.Length; i++)
                        {
                            if (pt2.answers[i]) Qwes[counter][i]++;
                        }
                        counter++;
                    }
                    counter = 0;
                }


                return Qwes.ToArray();
            }
            catch { }
            return Qwes.ToArray();
        }

        public bool Register(User user,string adminKey)
        {

            if (adminKey != null)
            {
                var isAdmin = AdminKeys.FindSync(k => k.Value == adminKey);
                if (isAdmin != null)
                {
                    user.Type = 2;
                }
            }

            Users.InsertOne(user);

            return true;
        }

        public void DeleteTestResult(string id)
        {
            TestsResult.DeleteOneAsync(k => k.Id == id);
        }

        // обновление документа
        public async Task Update(User p)
        {
            await Users.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(p.Id)), p);
        }
        // удаление документа
        public async Task Remove(string id)
        {
            await Quizes.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
        // получение изображения
        public async Task<byte[]> GetImage(string id)
        {
            return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
        }

    }
}
