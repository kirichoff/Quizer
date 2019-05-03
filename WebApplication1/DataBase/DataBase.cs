using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Text;
using System.Security.Cryptography;

namespace TrpopSql
{
    class DataBase
    {

        const string connectionString = @"Data Source = DESKTOP-OIQNT93\SQLEXPRESS;Initial Catalog = Quizer;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        const string req = "SELECT dbo.Users.Firstname,dbo.Users.Lastname,dbo.Users.username,Roles.roleName FROM dbo.Users inner join Roles on Roles.id = Users.role_id;";
        const string insert = "INSERT INTO dbo.Users(Firstname,Lastname,username,dbo.Users.password,role_id) values";

        const string reqUs = "SELECT dbo.Users.username,dbo.Users.password FROM dbo.Users where dbo.Users.username =";

        const string admin = "SELECT dbo.Users.role_id FROM dbo.Users where dbo.Users.username =";
        SqlConnection connection;
        SqlCommand command;

        public DataBase()
        {
            connection= new SqlConnection(connectionString);
            connection.Open();
        }

        public void insertUser(string Firstname,string Lastname,string username,string password_hash,int role_id)
        {
            try
            {
                command = new SqlCommand(insert + $"('{Firstname}','{Lastname}','{username}','{Hash(password_hash)}',{role_id})", connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            }
        
        public void Autorisation(string username,string password)
        {
            SqlDataReader read;

            try
            {
               read = new SqlCommand(reqUs + $"'{username}'", connection).ExecuteReader();
                read.Read();
                if (read.GetValue(1).ToString() == Hash(password))
                {
                    Console.WriteLine("you are in matrixa");
                }
                else
                {
                    Console.WriteLine("no");
                }
                read.Close();
            }
            catch
            {
                
            }
            
        }


        public bool isAdmin(string username)
        {
            SqlDataReader read = new SqlCommand(admin + $"'{username}'", connection).ExecuteReader();
            read.Read();
            read.Close();
            try
            {
                read.Close();
                return (read.GetValue(0).ToString() == "1");
            }
            catch
            {
                read.Close();
                return false;
            }
            
        }

        public void View()
        {
            command = new SqlCommand(req, connection); 
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                
                for (int i = 0; i < 4; i++)
                {
                    Console.Write(reader.GetValue(i)+" ");
                }
                Console.WriteLine();
            }
            reader.Close();
            
        }

        private string Hash(string password)
        {
            Byte[] innput = Encoding.UTF8.GetBytes(password);
            Byte[] hashB = SHA256.Create().ComputeHash(innput);
            return BitConverter.ToString(hashB);
        }
    }
}
