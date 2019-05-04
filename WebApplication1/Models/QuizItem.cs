using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
