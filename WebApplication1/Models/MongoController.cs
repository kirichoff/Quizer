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
        // обращаемся к коллекции Phones
        private IMongoCollection<Admin> Phones
        {
            get { return database.GetCollection<Admin>("Admins"); }
        }
        private IMongoCollection<Quiz> Quizes
        {
            get { return database.GetCollection<Quiz>("Quizes"); }
        }
        private IMongoCollection<QuizStats> QuizStat
        {
            get { return database.GetCollection<QuizStats>("Users"); }
        }
        // получаем все документы, используя критерии фальтрации
        //public async Task<IEnumerable<Admin>> GetPhones(int? minPrice, int? maxPrice, string name)
        //{
        //    // строитель фильтров
        //    var builder = new FilterDefinitionBuilder<Admin>();
        //    var filter = builder.Empty; // фильтр для выборки всех документов
        //    // фильтр по имени
        //    if (!String.IsNullOrWhiteSpace(name))
        //    {
        //        filter = filter & builder.Regex("Name", new BsonRegularExpression(name));
        //    }
        //    if (minPrice.HasValue)  // фильтр по минимальной цене
        //    {
        //        filter = filter & builder.Gte("Price", minPrice.Value);
        //    }
        //    if (maxPrice.HasValue)  // фильтр по максимальной цене
        //    {
        //        filter = filter & builder.Lte("Price", maxPrice.Value);
        //    }

        //    return await Phones.Find(filter).ToListAsync();
        //}

        // получаем один документ по id

        public  Admin LogIn(string name)
        {
            var builder = new FilterDefinitionBuilder<Admin>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("Login", new BsonRegularExpression(name));
            return  Phones.Find(filter).FirstOrDefault();
        }

        public async Task<Admin> GetPhone(string id)
        {
            return await Phones.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }
        
        public  List<Quiz> GetQuiz(int count)
        {
            var builder = new FilterDefinitionBuilder<Quiz>();
            var filter = builder.Empty; // фильтр для выборки всех документов            
            return  Quizes.Find(filter).ToList();
        }

        public Quiz GetQuizById(string id)
        {
            return Quizes.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefault();
        }

        public async Task addQuiz(Quiz q)
        {
            await Quizes.InsertOneAsync(q);
        }

        // добавление документа
        public async Task AddAdmin(Admin p)
        {
            await Phones.InsertOneAsync(p);
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
            
            for ( int i = 0; i<ls.First().answerssmap.Length; i++)
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
                    for (int i =0; i< pt2.answers.Length; i++)
                    {
                        if (pt2.answers[i]) Qwes[counter][i]++;
                    }                    
                    counter++;
                }
                counter = 0;
            }
            

            return  Qwes.ToArray();
        }


        public double AveAge(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();


            double age = 0;

            foreach (var pt in ls)
            {
                age += pt.age;
            }            
            return age/ls.Count;
        }

        public double AveAnsers(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();


            double age = 0;

            foreach (var pt in ls)
            {
                age += pt.right_count;
            }
            return age / ls.Count * 100;
        }
     

        public int[] GetSex(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();


            int men = 0;
            int women = 0;

            foreach (var pt in ls)
            {
                if (pt.sex == "Женский") men++;
                else women++;
            }
            int[] a = { men, women, ls.Count };
            return a;
        }


        public int[] GetWork(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();


            int men = 0;
            int women = 0;

            foreach (var pt in ls)
            {
                if (pt.work == "Да") men++;
                else women++;
            }
            int[] a = { men, women, ls.Count };
            return a;
        }



        public int[] GetLoc(string id)
        {
            var builder = new FilterDefinitionBuilder<QuizStats>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("QuizId", new BsonRegularExpression(id));
            var ls = QuizStat.Find(new BsonDocument("QuizId", id)).ToList();


            int men = 0;
            int women = 0;

            foreach (var pt in ls)
            {
                if (pt.wher == "Город") men++;
                else women++;
            }
            int[] a = { men, women, ls.Count };
            return a;
        }




        // обновление документа
        public async Task Update(Admin p)
        {
            await Phones.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(p.Id)), p);
        }
        // удаление документа
        public async Task Remove(string id)
        {
            await Phones.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
        // получение изображения
        public async Task<byte[]> GetImage(string id)
        {
            return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
        }




        // сохранение изображения
        //public async Task StoreImage(string id, Stream imageStream, string imageName)
        //{
        //    Phone p = await GetPhone(id);
        //    if (p.HasImage())
        //    {
        //        // если ранее уже была прикреплена картинка, удаляем ее
        //        await gridFS.DeleteAsync(new ObjectId(p.ImageId));
        //    }
        //    // сохраняем изображение
        //    ObjectId imageId = await gridFS.UploadFromStreamAsync(imageName, imageStream);
        //    // обновляем данные по документу
        //    p.ImageId = imageId.ToString();
        //    var filter = Builders<Phone>.Filter.Eq("_id", new ObjectId(p.Id));
        //    var update = Builders<Phone>.Update.Set("ImageId", p.ImageId);
        //    await Phones.UpdateOneAsync(filter, update);
        //}
    }
}
