using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication1.Models
{
   public class QuizItem
    {
        public string Question { get; set; }
        public int Right { get; set; }
        public string Descripton { get; set; }
        public List<string> Questions { get; set; }
    }
}
