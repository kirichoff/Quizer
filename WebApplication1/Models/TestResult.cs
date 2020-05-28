using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class TestResult
    {
        public User UserTest { get; set; }
        [Display(Name = "QuizId")]
        public string QuizId { get; set; }
        public List<AnswerssItem> Answerss { get; set; }

        public class AnswerssItem
        {
            public QuizItem TestItem { get; set; }
            public bool[] question { get; set; }
        }
    }
}
