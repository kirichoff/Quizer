using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApplication1.Models
{
    public class TestResult
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public User UserTest { get; set; }
        [Display(Name = "QuizId")]
        public string QuizId { get; set; }
        public List<AnswersItem> Answers { get; set; }
        public string QuizHeader { get; set; }
        public class AnswersItem
        {
            public QuizItem TestItem { get; set; }
            public bool[] Answer { get; set; }
        }
    }
}
