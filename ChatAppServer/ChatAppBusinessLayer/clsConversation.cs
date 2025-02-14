using ChatAppDataAccess;
using ChatAppDataAccess.Dto_s;
using ChatAppServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppBusinessLayer
{
    public class clsConversation
    {
        public int ConversationId { get; set; }
        public int User1 { get; set; }
        public int User2 { get; set; }
        public clsUser? User_1 { get; set; }
        public clsUser? User_2 { get; set; }

        public List<clsMessage>? Messages { get; set; }
        public ConversationDto ConversationDto
        {
            get 
            {
                return new ConversationDto(this.ConversationId, this.User1, this.User2);
            }
        }

        public clsConversation(ConversationDto ConversationDto)
        {
            this.ConversationId = ConversationDto.ConversationId;
            this.User1 = ConversationDto.User1;
            this.User2 = ConversationDto.User2;
            this.User_1 = new clsUser();
            this.User_2 = new clsUser();
            this.Messages = new List<clsMessage>();
        }

        public clsConversation(ConversationModel Conversationmodel)
        {
            this.ConversationId = Conversationmodel.ConversationId;
            this.User1 = Conversationmodel.User1;
            this.User2 = Conversationmodel.User2;
            //this.User_1 = new clsUser();
            //this.User_2 = new clsUser();
            //this.Messages = new List<clsMessage>();
        }

        public static clsConversation GetConversationById(int ConversationId)
        {
            ConversationDto Conversation = ConversationData.GetConversationById(ConversationId);
            if (Conversation == null)
            {
                return null;
            }
            clsConversation conversation = new clsConversation(new ConversationDto(Conversation.ConversationId, Conversation.User1, Conversation.User2));

            foreach (MessageDto message in Conversation.Messages)
            {
                conversation.Messages.Add(new clsMessage(new MessageDto( message.MessageId,message.MessageContent,message.SentAt,
                    message.ConversationId,message.SenderId)));
            }

            conversation.User_1 = new clsUser(new UserDto( Conversation.User_1.UserId,Conversation.User_1.FirstName,Conversation.User_1.LastName,
                Conversation.User_1.UserName,Conversation.User_1.PassWord,Conversation.User_1.ProfilePic,Conversation.User_1.DateOfBirth,
                Conversation.User_1.Gender,Conversation.User_1.PhoneNumber,Conversation.User_1.Email,Conversation.User_1.IsActive));

            conversation.User_2 =new clsUser( new UserDto(Conversation.User_2.UserId, Conversation.User_2.FirstName, Conversation.User_2.LastName,
                Conversation.User_2.UserName, Conversation.User_2.PassWord, Conversation.User_2.ProfilePic, Conversation.User_2.DateOfBirth,
                Conversation.User_2.Gender, Conversation.User_2.PhoneNumber, Conversation.User_2.Email, Conversation.User_2.IsActive));


            return conversation ;  
        }

        public static List<ConversationDto> GetConversationsByUserId(int UserId)
        {
             return ConversationData.GetConversationsByUserId(UserId);
          
        }

        public bool AddNewConversaTion()
        {
            this.ConversationId = ConversationData.AddNewConversation(new ConversationModel(0, this.User1, this.User2));

            return (this.ConversationId != -1);
        }

        public static bool IsConversationExists(int User1Id , int User2Id)
        {
            return ConversationData.IsConversationExists(User1Id,User2Id);
        }
    }
}
