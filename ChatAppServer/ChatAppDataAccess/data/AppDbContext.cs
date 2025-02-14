using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatAppDataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ChatAppDataAccess.data
{
    internal class AppDbContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            var Config = new ConfigurationBuilder().AddJsonFile("AppConfig.json").Build();
            var ConnectionString = Config.GetSection("ConnectionString").Value;

            optionsBuilder.UseSqlServer(ConnectionString);

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Conversation>().HasOne(c => c.User_1).WithMany(u => u.ConversationsAsUser1).HasForeignKey(c=>c.User1);

            modelBuilder.Entity<Conversation>().HasOne(c => c.User_2).WithMany(u => u.ConversationsAsUser2).HasForeignKey(c=>c.User2);

            modelBuilder.Entity<Message>().HasOne(m=>m.Conversation).WithMany(c=>c.Messages).HasForeignKey(m=>m.ConversationId);

            modelBuilder.Entity<Message>().HasOne(m => m.User).WithMany(u => u.Messages).HasForeignKey(m=>m.SenderId);
        }
    }
}
