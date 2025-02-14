using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.models
{
    internal class Conversation
    {
        public int ConversationId { get; set; }
        public int User1 {  get; set; }
        public int User2 { get; set; }

        public User User_1 { get; set; } 
        public User User_2 { get; set; } 

       public List<Message> Messages { get; set; }
    }
}
