using ChatAppDataAccess.data;
using ChatAppDataAccess.Dto_s;
using ChatAppDataAccess.models;
using ChatAppDataAccess.Utiles;
using ChatAppServer;
using Microsoft.AspNetCore.Http;
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
    public class ConversationData
    {
        public static ConversationDto GetConversationById(int ConversationId)
        {
            ConversationDto Conversationdto = null;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    Conversation Conversation = Context.Conversations
                        .Include(c=>c.Messages)
                        .Include(c=>c.User_1)
                        .Include(c=>c.User_2)
                        .FirstOrDefault(c=>c.ConversationId==ConversationId);
                    if (Conversation == null)
                        return null;

                    Conversationdto = new ConversationDto(Conversation.ConversationId , Conversation.User1 , Conversation.User2 );

                    //handle navigation properties
                    foreach (Message message in Conversation.Messages)
                    {
                        Conversationdto.Messages.Add(new MessageDto(message.MessageId,message.MessageContent,message.SentAt,
                            message.ConversationId,message.SenderId));
                    }

                    Conversationdto.User_1.UserId = Conversation.User_1.UserId;
                    Conversationdto.User_1.FirstName = Conversation.User_1.FirstName;
                    Conversationdto.User_1.LastName = Conversation.User_1.LastName;
                    Conversationdto.User_1.UserName = Conversation.User_1.UserName;
                    Conversationdto.User_1.PassWord = Conversation.User_1.PassWord;
                    Conversationdto.User_1.DateOfBirth = Conversation.User_1.DateOfBirth;
                    Conversationdto.User_1.Gender = Conversation.User_1.Gender;
                    Conversationdto.User_1.Email = Conversation.User_1.Email;
                    Conversationdto.User_1.PhoneNumber = Conversation.User_1.PhoneNumber;
                    Conversationdto.User_1.IsActive = Conversation.User_1.IsActive;

                    if(Conversation.User_1.ProfilePic != null)
                    {
                        string FileName = Conversation.User_1.ProfilePic;
                        string FilePath = Path.Combine(UserData.ImagesDirectory,FileName);

                        FileStream stream = File.OpenRead(FilePath);
                        IFormFile UserImage = new FormFile(stream,FileName,UserData.GetMimeType(FilePath));

                        Conversationdto.User_1.ProfilePic = UserImage;

                        UserData.Files.Add(stream);
                    }
                    else
                    {
                        Conversationdto.User_1.ProfilePic = null;
                    }


                    Conversationdto.User_2.UserId = Conversation.User_2.UserId;
                    Conversationdto.User_2.FirstName = Conversation.User_2.FirstName;
                    Conversationdto.User_2.LastName = Conversation.User_2.LastName;
                    Conversationdto.User_2.UserName = Conversation.User_2.UserName;
                    Conversationdto.User_2.PassWord = Conversation.User_2.PassWord;
                    Conversationdto.User_2.DateOfBirth = Conversation.User_2.DateOfBirth;
                    Conversationdto.User_2.Gender = Conversation.User_2.Gender;
                    Conversationdto.User_2.Email = Conversation.User_2.Email;
                    Conversationdto.User_2.PhoneNumber = Conversation.User_2.PhoneNumber;
                    Conversationdto.User_2.IsActive = Conversation.User_2.IsActive;

                    if (Conversation.User_2.ProfilePic != null)
                    {
                        string FileName = Conversation.User_2.ProfilePic;
                        string FilePath = Path.Combine(UserData.ImagesDirectory, FileName);

                        FileStream stream = File.OpenRead(FilePath);
                        IFormFile UserImage = new FormFile(stream, FileName, UserData.GetMimeType(FilePath));

                        Conversationdto.User_2.ProfilePic = UserImage;

                        UserData.Files.Add(stream);
                    }
                    else
                    {
                        Conversationdto.User_2.ProfilePic = null;
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return Conversationdto;
        }

        public static List<ConversationDto> GetConversationsByUserId(int UserId)
        {
            List<ConversationDto> ConversationsToReturn = new List<ConversationDto>();
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    List<Conversation> Conversations = Context.Conversations
                        .Include(c=>c.User_1)
                        .Include(c=>c.User_2)
                        .Where(c => (c.User1==UserId || c.User2==UserId)).ToList();
                    if (Conversations.Count ==0)
                        return ConversationsToReturn;

                    foreach(Conversation conversation in Conversations)
                    {
                        ConversationDto convers = new ConversationDto(conversation.ConversationId, conversation.User1, conversation.User2);
                        convers.User_1.UserId = conversation.User_1.UserId;
                        convers.User_1.FirstName = conversation.User_1.FirstName;
                        convers.User_1.LastName = conversation.User_1.LastName;
                        convers.User_1.UserName = conversation.User_1.UserName;
                        convers.User_1.PassWord = conversation.User_1.PassWord;
                       // convers.User_1.ProfilePic = UserPic;
                        convers.User_1.DateOfBirth = conversation.User_1.DateOfBirth;
                        convers.User_1.Email = conversation.User_1.Email;
                        convers.User_1.PhoneNumber = conversation.User_1.PhoneNumber;
                        convers.User_1.IsActive = conversation.User_1.IsActive;



                        if (conversation.User_1.ProfilePic != null)
                        {
                            string FileName = conversation.User_1.ProfilePic;
                            string FilePath = Path.Combine(UserData.ImagesDirectory,FileName );

                            FileStream stream = File.OpenRead(FilePath);
                            IFormFile UserPic = new FormFile(stream, FileName, UserData.GetMimeType(FilePath));

                            convers.User_1.ProfilePic = UserPic;

                            UserData.Files.Add(stream);
                          
                        }
                        else
                        {
                            convers.User_1.ProfilePic = null;
                        }

                        convers.User_2.UserId = conversation.User_2.UserId;
                        convers.User_2.FirstName = conversation.User_2.FirstName;
                        convers.User_2.LastName = conversation.User_2.LastName;
                        convers.User_2.UserName = conversation.User_2.UserName;
                        convers.User_2.PassWord = conversation.User_2.PassWord;
                        convers.User_2.DateOfBirth = conversation.User_2.DateOfBirth;
                        convers.User_2.Email = conversation.User_2.Email;
                        convers.User_2.PhoneNumber = conversation.User_2.PhoneNumber;
                        convers.User_2.IsActive = conversation.User_2.IsActive;

                        if (conversation.User_2.ProfilePic != null)
                        {
                            string FileName = conversation.User_2.ProfilePic;
                            string FilePath = Path.Combine(UserData.ImagesDirectory, FileName);

                            FileStream stream = File.OpenRead(FilePath);
                            IFormFile UserPic = new FormFile(stream, FileName, UserData.GetMimeType(FilePath));

                            convers.User_2.ProfilePic = UserPic;

                            UserData.Files.Add(stream);

                        }
                        else
                        {
                            convers.User_2.ProfilePic = null;   
                        }

                        ConversationsToReturn.Add(convers);

                        
                    }

                }
                catch (Exception ex)
                {

                }
            }

            return ConversationsToReturn;
        }
        public static int AddNewConversation(ConversationModel NewConversation)
        {
            int NewConversationId = -1;
            using (AppDbContext context = new AppDbContext())
            {
                try
                {
                    SqlParameter NewConversationIdOutput = new SqlParameter("@NewConversationId", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output,
                    };

                    context.Database.ExecuteSqlInterpolated($"Exec Sp_AddNewConversation @User1Id = {NewConversation.User1} , @User2Id = {NewConversation.User2} ,@NewConversationId = {NewConversationIdOutput} OUTPUT ");

                    NewConversationId =(int) NewConversationIdOutput.Value;
                }
                catch(Exception ex)
                {

                }
            }

            return NewConversationId;
        }

        public static bool IsConversationExists(int User1Id, int User2Id)
        {
            bool IsFound = false;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    Conversation conversation = Context.Conversations
                        .FirstOrDefault(c=>(c.User1== User1Id && c.User2== User2Id || c.User1 == User2Id && c.User2 == User1Id));

                    IsFound = (conversation != null); 
                }
                catch (Exception ex)
                {

                }
            }

            return IsFound;
        }
    }
}
