using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.Dto_s
{
    public class MessageDto
    {
        public int MessageId { get; set; }
        public string MessageContent { get; set; } = "";
        public DateTime SentAt { get; set; }
        public int ConversationId { get; set; }
        public int SenderId { get; set; }

        public MessageDto(int MessageId , string MessageContent , DateTime SentAt , int ConversationId, int SenderId)
        {
            this.MessageId = MessageId;
            this.MessageContent = MessageContent;
            this.SentAt = SentAt;
            this.ConversationId = ConversationId;
            this.SenderId = SenderId;
        }
    }
}
