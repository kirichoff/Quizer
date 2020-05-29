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
        public string Login(string name, string pas)
        {
            var b = db.LogIn(name);

            if (b != null && b.Pass_hash == pas)
            {
                return JsonConvert.SerializeObject(
                    b
                );
            }
            else
            {
                return JsonConvert.SerializeObject(
                   "false"
                );
            }
        }

        [HttpGet("[action]")]
        public async void Register(string user,string adminKey)
        {
            db.AddUser(
                JsonConvert.DeserializeObject<User>(user),
                adminKey
            );
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
        public string GetQuiz()
        {
            return JsonConvert.SerializeObject(
                db.GetQuiz()
            );
        }

        [HttpGet("[action]")]
        public string GetQuizById(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetQuizById(id)
            );
        }
        [HttpPost("[action]")]
        public void SetTestResults(string q)
        {
            db.AddTestResult(
            JsonConvert.DeserializeObject<TestResult>(q)
                             );
        }

        [HttpGet("[action]")]
        public string GetTestResults(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetTestResult(id)
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
        public string GetStatsQ(string id)
        {
            return JsonConvert.SerializeObject(
                db.GetStatsQ(id)
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