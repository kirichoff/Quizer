using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using Newtonsoft.Json;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private MongoController db;                

        public SampleDataController(MongoController con)
        {           
            db = con;       
        }

        private string Hash(string password)
        {
            Byte[] innput = Encoding.UTF8.GetBytes(password);
            Byte[] hashB = SHA256.Create().ComputeHash(innput);
            return BitConverter.ToString(hashB);
        }
        [HttpGet("[action]")]
        public string Login(string name,string pas )
        {
            var b = db.LogIn(name);
                            
                if(b.Pass_hash == pas)
                {
              return  JsonConvert.SerializeObject(
                     "true"
                ); 
                }                               
            else
            {
                return JsonConvert.SerializeObject(
                  "false"
                  );
            }           

        }
        [HttpPost("[action]")]

        public async void Delete(string id)
        {
            await db.Remove(id);
        }

        [HttpPost("[action]")]
        public async void AddQuiz(string q)
        {            
                   await db.addQuiz(
                   JsonConvert.DeserializeObject<Quiz>(q)
                                    );      
        }
        [HttpGet("[action]")]
        public  string GetQuiz(int hash)
        {            
             return JsonConvert.SerializeObject(
                 db.GetQuiz(hash)
                 );
        }

        [HttpGet("[action]")]
        public string GetQuizById(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetQuizById(id)
                );
        }

        [HttpGet("[action]")]
        public string GetQuizHeaders(int count)
        {
            return JsonConvert.SerializeObject(
                db.GetQuiz(count)
                );
        }

        [HttpGet("[action]")]
        public string GetStatsOfQuestion(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetStatsOfQuestion(id)
                );
        }


        [HttpGet("[action]")]
        public string GetGender(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetSex(id)
                );
        }


        [HttpGet("[action]")]
        public string GetStatsQ(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetStatsQ(id)
                );
        }


        [HttpGet("[action]")]
        public string GetLocation(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetLoc(id)
                );
        }

        [HttpGet("[action]")]
        public string GetWork(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetWork(id)
                );
        }

        [HttpPost("[action]")]
        public async void SendStat(string body)
        {
            var obj = JsonConvert.DeserializeObject<QuizStats>(body);
            await db.AddQuizStats(                            
                                        obj
                );
        }
    }
}
