using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.models
{
    internal class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string UserName { get; set; } = "";
        public string PassWord { get; set; } = "";
        public string? ProfilePic { get; set; } = "";
        public DateTime DateOfBirth { get; set; }
        public char? Gender { get; set; }
        public string PhoneNumber { get; set; } = "";
        public string Email { get; set; } = "";
        public bool IsActive { get; set; }

        public List<Conversation> ConversationsAsUser1 { get; set; }
        public List<Conversation> ConversationsAsUser2 { get; set; }
        public List<Message> Messages { get; set; }
    }
}
