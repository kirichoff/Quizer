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
        public async void Pisun(int startDateIndex)
        {            
            Admin A = (new Admin {Login = "Real", Pass_hash = "Admin" });
          //  await db.Create(A);
        }
        [HttpPost("[action]")]
        public string Login(Admin ad)
        {
            var b = db.LogIn(ad.Login);
            if (b.Result != null)
            {                
                return b.Result.Login;
            }
            else
            {
                return "Neo";
            }           
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
        [HttpPost("[action]")]
        public async void SendStat(QuizStats q)
        {
            await db.AddQuizStats(q);
        }
    }
}
