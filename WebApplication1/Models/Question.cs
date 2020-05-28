using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Question
    {
        public string Text { get; set; }
        public bool Right { get; set; }
        public double Point { get; set; }
    }
}
