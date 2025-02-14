using ChatAppDataAccess.data;
using ChatAppDataAccess.Dto_s;
using ChatAppDataAccess.models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess
{
    public class MessageData
    {
        public static List<MessageDto> GetMessagesByConversationId(int conversationId)
        {
            List<MessageDto> messages = new List<MessageDto>();
            using (AppDbContext context = new AppDbContext())
            {
                try
                {
                    List<Message> messagesList = context.Messages
                       
                        .Where(m => m.ConversationId == conversationId).ToList();

                    foreach (Message message in messagesList)
                    {
                        messages.Add(new MessageDto(message.MessageId, message.MessageContent, message.SentAt, message.ConversationId, message.SenderId));
                    }
                }
                catch (Exception ex) 
                {
           
                }
                
            }

            return messages;
        }

        public static int AddNewMessage(MessageDto NewMessage)
        {
            int NewMessageId = -1;
            using(AppDbContext Context = new AppDbContext())
            {
                try
                {
                    SqlParameter NewMessageIdOutput = new SqlParameter("@NewMessageId", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output,
                    };

                    Context.Database.ExecuteSqlInterpolated($"Exec SP_AddNewMessage @MessageContent = {NewMessage.MessageContent} , @ConversationId = {NewMessage.ConversationId} , @SenderId = {NewMessage.SenderId} , @NewMessageId = {NewMessageIdOutput} OUTPUT");
                    NewMessageId = (int) NewMessageIdOutput.Value;
                }
                catch (Exception ex)
                {

                }
            }

            return NewMessageId;
        }
    }
}
