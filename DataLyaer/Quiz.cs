using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer
{
    class Quiz
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Baground { get; set;}
        public List<QuizItem> Items { get; set; }
    }
}
