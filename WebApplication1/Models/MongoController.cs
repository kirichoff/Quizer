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

        public async Task<Admin> LogIn(string name)
        {
            var builder = new FilterDefinitionBuilder<Admin>();
            var filter = builder.Empty; // фильтр для выборки всех документов
            filter = filter & builder.Regex("Login", new BsonRegularExpression(name));
            return await Phones.Find(filter).FirstOrDefaultAsync();
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
