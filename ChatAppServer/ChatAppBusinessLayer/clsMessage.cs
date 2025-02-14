using ChatAppDataAccess;
using ChatAppDataAccess.Dto_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppBusinessLayer
{
    public class clsMessage
    {
        public int MessageId { get; set; }
        public string MessageContent { get; set; } = "";
        public DateTime SentAt { get; set; }
        public int ConversationId { get; set; }
        public int SenderId { get; set; }
        public MessageDto MessageDto
        {
            get
            {
                return new MessageDto(this.MessageId, this.MessageContent, this.SentAt, this.ConversationId, this.SenderId);
            }
        }
        public clsMessage(MessageDto message)
        {
            this.MessageId = message.MessageId;
            this.MessageContent = message.MessageContent;
            this.SentAt = message.SentAt;
            this.ConversationId = message.ConversationId;
            this.SenderId = message.SenderId;


        }
       

        public static List<MessageDto> GetMessagesByConversationId(int ConversationId)
        {
            return MessageData.GetMessagesByConversationId (ConversationId);
        }

        public bool AddNewMessage()
        {
            this.MessageId = MessageData.AddNewMessage(new MessageDto(0,this.MessageContent,this.SentAt,this.ConversationId,this.SenderId));

            return (this.MessageId != -1);
        }
    }
}
