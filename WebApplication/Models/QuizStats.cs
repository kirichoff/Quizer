using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class QuizStats
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Display(Name = "wher")]
        public string wher { get; set; }
        [Display(Name = "sex")]
        public string sex { get; set; }
        [Display(Name = "work")]
        public string work { get; set; }
        [Display(Name = "age")]
        public int age { get; set; }
        [Display(Name = "lern")]
        public string lern { get; set; }
        [Display(Name = "QuizId")]
        public string QuizId { get; set; }
        [Display(Name = "answerssmap")]
        public AnswerssMap[] answerssmap { get; set;}
        [Display(Name = "right_count")]
        public int right_count { get; set; }
    }
}
