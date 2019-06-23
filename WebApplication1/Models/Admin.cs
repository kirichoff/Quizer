using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
   public class Admin
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Display(Name ="Login")]
        public string Login { get; set; } 
        [Display(Name = "Pass_hash")]
        public string Pass_hash { get; set; }
    }
}
