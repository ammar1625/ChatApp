
using ChatAppDataAccess.data;
using ChatAppDataAccess.Dto_s;
using ChatAppDataAccess.models;
using ChatAppDataAccess.Utiles;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ChatAppDataAccess
{
    public class UserData
    {
        public static string ImagesDirectory = @"C:\ChatApp-Images";
      
        public static FileStream stream = null; //this is used to bring every single user profile pic from files directory when we call find single user methode and to dispose it manually after its usage is finished 
        public static List<FileStream> Files = new List<FileStream>(); //this is used to store every user profile pic but when we call users list methode so every stream is stored in the list to dispose it manually later
        public static UserDto GetUserById(int UserId)
        {
            User? UserToFind = null;
            UserDto? UserDtoToReturn = null;

            using (AppDbContext Context = new AppDbContext()) 
            {
                try
                {
                    UserToFind = Context.Users
                        .Include(u=>u.Messages)
                        .Include(u=>u.ConversationsAsUser1).
                        Include(u=>u.ConversationsAsUser2)
                        .FirstOrDefault(u => u.UserId == UserId);

                    //in case user = null return null 
                    if (UserToFind == null)
                    {
                        return null;
                    }

                    //in case the user is found and has a profile pic
                    if(UserToFind.ProfilePic != null)
                    {
                        //handle user profile pic

                        string ImagePath = Path.Combine(ImagesDirectory, UserToFind.ProfilePic);

                        stream = File.OpenRead(ImagePath);

                        IFormFile UserImage = new FormFile(stream, UserToFind.ProfilePic, GetMimeType(UserToFind.ProfilePic));

                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                            UserToFind.PassWord, UserImage, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                            UserToFind.IsActive);

                       
                    }
                    //else return the user and set the profile pic to null
                    else
                    {
                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                           UserToFind.PassWord, null, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                           UserToFind.IsActive);

                    }

                    //handle navigation properties
                    foreach (Message message in UserToFind.Messages)
                    {
                        UserDtoToReturn.Messages.Add(new MessageDto(message.MessageId, message.MessageContent, message.SentAt,
                            message.ConversationId, message.SenderId));
                    }

                    foreach(Conversation conversation in UserToFind.ConversationsAsUser1)
                    {
                        UserDtoToReturn.ConversationsAsUser1.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                    foreach (Conversation conversation in UserToFind.ConversationsAsUser2)
                    {
                        UserDtoToReturn.ConversationsAsUser2.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                }
                catch (Exception ex) 
                {

                }
            }

           

            return UserDtoToReturn;

        }

        //by user name and password
        public static UserDto GetUserByUserNamePassWord(string UserName ,string PassWord)
        {
            User? UserToFind = null;
            UserDto? UserDtoToReturn = null;

            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    UserToFind = Context.Users
                        .Include(u => u.Messages)
                        .Include(u => u.ConversationsAsUser1).
                        Include(u => u.ConversationsAsUser2)
                        .FirstOrDefault(u => u.UserName == UserName && u.PassWord == PassWord);

                    //in case user = null return null 
                    if (UserToFind == null)
                    {
                        return null;
                    }

                    //in case the user is found and has a profile pic
                    if (UserToFind.ProfilePic != null)
                    {
                        //handle user profile pic

                        string ImagePath = Path.Combine(ImagesDirectory, UserToFind.ProfilePic);

                        stream = File.OpenRead(ImagePath);

                        IFormFile UserImage = new FormFile(stream, UserToFind.ProfilePic, GetMimeType(UserToFind.ProfilePic));

                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                            UserToFind.PassWord, UserImage, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                            UserToFind.IsActive);


                    }
                    //else return the user and set the profile pic to null
                    else
                    {
                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                           UserToFind.PassWord, null, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                           UserToFind.IsActive);

                    }

                    //handle navigation properties
                    foreach (Message message in UserToFind.Messages)
                    {
                        UserDtoToReturn.Messages.Add(new MessageDto(message.MessageId, message.MessageContent, message.SentAt,
                            message.ConversationId, message.SenderId));
                    }

                    foreach (Conversation conversation in UserToFind.ConversationsAsUser1)
                    {
                        UserDtoToReturn.ConversationsAsUser1.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                    foreach (Conversation conversation in UserToFind.ConversationsAsUser2)
                    {
                        UserDtoToReturn.ConversationsAsUser2.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                }
                catch (Exception ex)
                {

                }
            }



            return UserDtoToReturn;

        }

        public static UserDto LogIn(string Email , string PassWord)
        {
            User? UserToFind = null;
            UserDto? UserDtoToReturn = null;

            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    UserToFind = Context.Users
                        .Include(u=>u.Messages)
                          .Include(u => u.ConversationsAsUser1).
                        Include(u => u.ConversationsAsUser2)
                        .FirstOrDefault(u => u.Email == Email && u.PassWord == PassWord && u.IsActive == true);

                    //in case user = null return null 
                    if (UserToFind == null)
                    {
                        return null;
                    }

                    //in case the user is found and has a profile pic
                    if (UserToFind.ProfilePic != null)
                    {
                        //handle user profile pic

                        string ImagePath = Path.Combine(ImagesDirectory, UserToFind.ProfilePic);

                        stream = File.OpenRead(ImagePath);

                        IFormFile UserImage = new FormFile(stream, UserToFind.ProfilePic, GetMimeType(UserToFind.ProfilePic));

                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                            UserToFind.PassWord, UserImage, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                            UserToFind.IsActive);
                    }
                    //else return the user and set the profile pic to null
                    else
                    {
                        UserDtoToReturn = new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName,
                           UserToFind.PassWord, null, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email,
                           UserToFind.IsActive);

                    }

                    //handle navigation properties
                    foreach (Message message in UserToFind.Messages)
                    {
                        UserDtoToReturn.Messages.Add(new MessageDto(message.MessageId, message.MessageContent, message.SentAt,
                            message.ConversationId, message.SenderId));
                    }

                    foreach (Conversation conversation in UserToFind.ConversationsAsUser1)
                    {
                        UserDtoToReturn.ConversationsAsUser1.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                    foreach (Conversation conversation in UserToFind.ConversationsAsUser2)
                    {
                        UserDtoToReturn.ConversationsAsUser2.Add(new ConversationDto(conversation.ConversationId, conversation.User1,
                            conversation.User2));
                    }

                }
                catch (Exception ex)
                {

                }
            }

            return UserDtoToReturn;

        }
        public static int AddNewUser(UserDto NewUser)
        {
            int NewUserId = -1;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    var OutPutUserId = new SqlParameter("@NewUserId", System.Data.SqlDbType.Int) { Direction = System.Data.ParameterDirection.Output };

                    //handle user image
                    if (NewUser.ProfilePic != null)
                    {
                        if (!Directory.Exists(ImagesDirectory))
                        {
                            Directory.CreateDirectory(ImagesDirectory);
                        }

                        string FileName = Guid.NewGuid().ToString() + Path.GetExtension(NewUser.ProfilePic.FileName);
                        string FilePath = Path.Combine(ImagesDirectory, FileName);

                        using(FileStream stream = new FileStream(FilePath , FileMode.Create))
                        {
                            NewUser.ProfilePic.CopyTo(stream);
                        }

                        Context.Database.ExecuteSqlInterpolated($"exec SP_AddNewUser @FirstName ={NewUser.FirstName},@LastName ={NewUser.LastName}, @UserName ={NewUser.UserName}, @PassWord = {NewUser.PassWord},\r\n@ProfilePic ={FileName},\r\n@DateOfBirth = {NewUser.DateOfBirth}, @Gender = {NewUser.Gender},\r\n@PhoneNumber ={NewUser.PhoneNumber},@Email ={NewUser.Email}, @NewUserId ={OutPutUserId} OUTPUT");

                    }
                    //if there is no image set it to null
                    else
                    {
                        Context.Database.ExecuteSqlInterpolated($"exec SP_AddNewUser @FirstName ={NewUser.FirstName},@LastName ={NewUser.LastName}, @UserName ={NewUser.UserName}, @PassWord = {NewUser.PassWord},\r\n@ProfilePic ={null},\r\n@DateOfBirth = {NewUser.DateOfBirth}, @Gender = {NewUser.Gender},\r\n@PhoneNumber ={NewUser.PhoneNumber},@Email ={NewUser.Email}, @NewUserId ={OutPutUserId} OUTPUT ");
                    }

                    NewUserId = (int)OutPutUserId.Value;
                }
                catch (Exception ex)
                {

                }

                return NewUserId;
            }
        }

        public static bool UpdateUser(UserDto User)
        {
            int AffectedRows = 0;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    //handle user image
                    if (User.ProfilePic != null)
                    {
                        if (!Directory.Exists(ImagesDirectory))
                        {
                            Directory.CreateDirectory(ImagesDirectory);
                        }

                        string FileName = Guid.NewGuid().ToString() + Path.GetExtension(User.ProfilePic.FileName);
                        string FilePath = Path.Combine(ImagesDirectory, FileName);

                        using (FileStream stream = new FileStream(FilePath, FileMode.Create))
                        {
                            User.ProfilePic.CopyTo(stream);
                        }

                        AffectedRows =  Context.Database.ExecuteSqlInterpolated($"exec SP_UpdateUser @UserId = {User.UserId}, @FirstName = {User.FirstName},@LastName ={User.LastName}, @UserName ={User.UserName},@ProfilePic ={FileName},@DateOfBirth = {User.DateOfBirth}, @Gender = {User.Gender},\r\n@PhoneNumber ={User.PhoneNumber},@Email ={User.Email}");

                    }
                    //if there is no image set it to null
                    else
                    {
                      AffectedRows =   Context.Database.ExecuteSqlInterpolated($"exec SP_UpdateUser @UserId = {User.UserId} , @FirstName = {User.FirstName},@LastName ={User.LastName}, @UserName ={User.UserName},\r\n@ProfilePic ={null},\r\n@DateOfBirth = {User.DateOfBirth}, @Gender = {User.Gender},\r\n@PhoneNumber ={User.PhoneNumber},@Email ={User.Email}");

                    }
                }
                catch (Exception ex) 
                {
                }
            }

            return AffectedRows > 0;
        }

        public static bool IsUserExistsByEmail(string Email)
        {
            bool IsExists = false;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    var User = Context.Users.FirstOrDefault(u => u.Email == Email);

                    IsExists = (User != null);
                }
                catch (Exception ex)
                {

                }
            }

            return IsExists;
        }
        public static bool IsUserExistsByUserName(string UserName)
        {
            bool IsExists = false;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    var User = Context.Users.FirstOrDefault(u => u.UserName == UserName);

                    IsExists = (User != null);
                }
                catch (Exception ex)
                {

                }
            }

            return IsExists;
        }

        public static bool IsUserExistsByPhoneNumber(string PhoneNumber)
        {
            bool IsExists = false;
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    var User = Context.Users.FirstOrDefault(u => u.PhoneNumber == PhoneNumber);

                    IsExists = (User != null);
                }
                catch (Exception ex)
                {

                }
            }

            return IsExists;
        }

        public static bool ChangeUserPassWord(int UserId , string PassWord)
        {
            int AffectedRows = 0;
            using(AppDbContext Context = new AppDbContext())
            {
                try
                {
                   AffectedRows =  Context.Database.ExecuteSqlInterpolated($"Exec Sp_ChangePassword @UserId = {UserId} , @PassWord = {PassWord}");
                }
                catch(Exception ex)
                {

                }
            }

            return (AffectedRows > 0);
        }

        public static bool DeleteUser(string UserName , string PassWord)
        {
            int AffectedRows = 0;
            using(AppDbContext Context = new AppDbContext())
            {
                try
                {
                    AffectedRows = Context.Database.ExecuteSqlInterpolated($"Exec Sp_DeleteUser @UserName = {UserName} , @PassWord = {PassWord}");
                }
                catch(Exception ex)
                {

                }
            }

            return (AffectedRows > 0);
        }

        public static List<UserDto> FilterUserByUserName(string UserNameQuery)
        {
            List<UserDto> Users = new List<UserDto>();
            List<User> UsersModel = new List<User>();
            using (AppDbContext Context = new AppDbContext())
            {
                try
                {
                    UsersModel = Context.Users.Include(u=>u.Messages)
                          .Include(u => u.ConversationsAsUser1)
                          .Include(u => u.ConversationsAsUser2)
                          .Where(u=>u.UserName.Contains(UserNameQuery)).ToList();

                    //incase no user found return empty userdto list
                    if(UsersModel.Count==0)
                    {
                        return Users;
                    }
                    else
                    {
                        //iterate through found users
                        foreach (User user in UsersModel)
                        {
                            //if user has profile pic then handle it 
                            if(user.ProfilePic != null)
                            {
                                string ImagePath = Path.Combine(ImagesDirectory, user.ProfilePic);

                                FileStream stream = File.OpenRead(ImagePath);

                                //cast the user image filestream to iformfile interface using FormFile class
                                IFormFile UserProfilePic = new FormFile(stream , user.ProfilePic , GetMimeType(user.ProfilePic));

                                Users.Add(new UserDto(user.UserId , user.FirstName , user.LastName , user.UserName , user.PassWord,UserProfilePic,
                                    user.DateOfBirth,user.Gender,user.PhoneNumber,user.Email,user.IsActive));

                                //add the current stream to the list to dispose evry single stream manually later and the clear the list
                                Files.Add(stream);
                            }
                            else
                            {
                                Users.Add(new UserDto(user.UserId, user.FirstName, user.LastName, user.UserName, user.PassWord, null,
                                  user.DateOfBirth, user.Gender, user.PhoneNumber, user.Email, user.IsActive));
                            }

                            foreach(Message message in user.Messages)
                            {
                                foreach(UserDto userdto in Users)
                                {
                                    if(message.SenderId==userdto.UserId)
                                    userdto.Messages.Add(new MessageDto(message.MessageId,message.MessageContent,message.SentAt,
                                        message.ConversationId,message.SenderId));
                                }
                            }

                            foreach(Conversation conversation in user.ConversationsAsUser1)
                            {
                                foreach(UserDto userdto in Users)
                                {
                                    userdto.ConversationsAsUser1.Add(new ConversationDto(conversation.ConversationId,
                                        conversation.User1, conversation.User2));
                                }
                            }

                            foreach (Conversation conversation in user.ConversationsAsUser2)
                            {
                                foreach (UserDto userdto in Users)
                                {
                                    userdto.ConversationsAsUser2.Add(new ConversationDto(conversation.ConversationId,
                                        conversation.User1, conversation.User2));
                                }
                            }
                        }
                    }
                }
                catch(Exception ex)
                { 

                  
                }
            }

            return Users;
        }

        public static string GetMimeType(string ImagePath)
        {
            string Extention = Path.GetExtension(ImagePath);

            return Extention switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "appication/octet-stream"
            };

            //switch (Extention)
            //{
            //    case ".jpg" or ".jpeg":
            //        return "image/jpeg";
            //    case  ".png":
            //        return "image/png";
            //    case  ".gif":
            //        return "image/gif";
            //    default:
            //        return "application/octet-stream";
            //};
        }
    }
}
