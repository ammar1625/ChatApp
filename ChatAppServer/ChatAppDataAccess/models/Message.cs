using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.models
{
    internal class Message
    {
        public int MessageId { get; set; }
        public string MessageContent { get; set; } = "";
        public DateTime SentAt { get; set; }
        public int ConversationId { get; set; }
        public int SenderId { get; set; }

        public Conversation Conversation { get; set; }

        public User User { get; set; }

    }
}
