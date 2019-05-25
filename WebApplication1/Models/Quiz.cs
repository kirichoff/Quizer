using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebApplication1.Models
{
    public class Quiz
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Display(Name = "Header")]
        public string Header { get; set; }
        [Display(Name = "Baground")]
        public string Baground { get; set;}
        [Display(Name = "istest")]
        public bool istest { get; set; }
        [Display(Name = "Items")]
        public List<QuizItem> Items { get; set; }
    }
}
