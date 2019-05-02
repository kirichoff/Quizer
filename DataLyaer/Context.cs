using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;

namespace DataLayer
{
    class Context:DbContext
    {
        public List<Admin> Admins { get; set; }

        public List<Quiz> Quizes { get; set; }

        public Context(DbContextOptions<Context> options): base(options)
        {

        }

        public class ContextFactory : IDesignTimeDbContextFactory<Context>
        {
            public Context CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<Context>();
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database = M;Trusted_Connection=True;MultipleActiveResultSets=true", b => b.MigrationsAssembly("DataLayer"));

                return new Context(optionsBuilder.Options);
            }
        }

        }
    }
