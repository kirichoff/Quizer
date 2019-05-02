using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace WebApplication1.Models
{
        public class Rootobject
        {
            public string Header { get; set; }
            public string Baground { get; set; }
            public Item[] Items { get; set; }
        }

        public class Item
        {
            public string Question { get; set; }
            public int Right { get; set; }
            public string Descripton { get; set; }
            public string[] Questions { get; set; }
        }    
}
