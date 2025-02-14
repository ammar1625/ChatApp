using ChatAppDataAccess;
using ChatAppDataAccess.Dto_s;
using Microsoft.AspNetCore.Http;

namespace ChatAppBusinessLayer
{
    public class clsUser
    {
        public enum EnMode {AddNew = 0 , Update=1}
        public EnMode Mode { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string UserName { get; set; } = "";
        public string PassWord { get; set; } = "";
        public IFormFile? ProfilePic { get; set; }
        public DateTime DateOfBirth { get; set; }
        public char? Gender { get; set; }
        public string PhoneNumber { get; set; } = "";
        public string Email { get; set; } = "";
        public bool IsActive { get; set; }

        public List<clsMessage>? Messages { get; set; }
       public List<clsConversation>? ConversationsAsUser1 { get; set; }
       public List<clsConversation>? ConversationsAsUser2 { get; set; }

        public UserDto userDto 
        {   get 
            {
                return new UserDto(this.UserId , this.FirstName , this.LastName , this.UserName , this.PassWord ,
                    this.ProfilePic , this.DateOfBirth , this.Gender , this.PhoneNumber , this.Email ,this.IsActive);
            }
           
        }

        public clsUser()
        {

        }
        public clsUser(UserDto user , EnMode Mode = EnMode.Update)
        {
            this.UserId = user.UserId;
            this.FirstName = user.FirstName;    
            this.LastName = user.LastName;
            this.UserName = user.UserName;
            this.PassWord = user.PassWord;
            this.ProfilePic = user.ProfilePic;
            this.DateOfBirth = user.DateOfBirth;
            this.Gender = user.Gender;
            this.PhoneNumber = user.PhoneNumber;
            this.Email = user.Email;
            this.IsActive = user.IsActive;
            this.Mode = Mode;
            this.Messages = new List<clsMessage>();
            this.ConversationsAsUser1 = new List<clsConversation>();
            this.ConversationsAsUser2 = new List<clsConversation>();

        }
        public static clsUser GetuserById(int UserId)
        {
            UserDto Userdto = UserData.GetUserById(UserId);
            if(Userdto == null)
            {
                return null;
            }

            clsUser User = new clsUser(new UserDto(Userdto.UserId, Userdto.FirstName, Userdto.LastName, Userdto.UserName, Userdto.PassWord,
                Userdto.ProfilePic, Userdto.DateOfBirth, Userdto.Gender, Userdto.PhoneNumber, Userdto.Email, Userdto.IsActive), EnMode.Update);


            foreach (MessageDto message in Userdto.Messages)
            {
                User.Messages.Add(new clsMessage(new MessageDto(message.MessageId,message.MessageContent,message.SentAt,message.ConversationId,
                    message.SenderId)));
            }

            foreach(ConversationDto conversation in Userdto.ConversationsAsUser1)
            {
                User.ConversationsAsUser1.Add(new clsConversation(new ConversationDto(conversation.ConversationId,
                    conversation.User1,conversation.User2)));
            }

            foreach (ConversationDto conversation in Userdto.ConversationsAsUser2)
            {
                User.ConversationsAsUser2.Add(new clsConversation(new ConversationDto(conversation.ConversationId,
                    conversation.User1, conversation.User2)));
            }

            return User;
            
        }

        public static clsUser LogIn(string Email ,string PassWord)
        {
            UserDto UserToFind = UserData.LogIn(Email.Trim() ,utiles.Utiles.ComputeSHA256Hash(PassWord.Trim()));
            if (UserToFind == null)
                return null;

            clsUser User = new clsUser(new UserDto(UserToFind.UserId, UserToFind.FirstName, UserToFind.LastName, UserToFind.UserName, UserToFind.PassWord,
                UserToFind.ProfilePic, UserToFind.DateOfBirth, UserToFind.Gender, UserToFind.PhoneNumber, UserToFind.Email, UserToFind.IsActive), EnMode.Update);


            foreach (MessageDto message in UserToFind.Messages)
            {
                User.Messages.Add(new clsMessage(new MessageDto(message.MessageId, message.MessageContent, message.SentAt, message.ConversationId,
                    message.SenderId)));
            }


            foreach (ConversationDto conversation in UserToFind.ConversationsAsUser1)
            {
                User.ConversationsAsUser1.Add(new clsConversation(new ConversationDto(conversation.ConversationId,
                    conversation.User1, conversation.User2)));
            }

            foreach (ConversationDto conversation in UserToFind.ConversationsAsUser2)
            {
                User.ConversationsAsUser2.Add(new clsConversation(new ConversationDto(conversation.ConversationId,
                    conversation.User1, conversation.User2)));
            }

            return User;
        }

        private bool AddNewUser()
        {
            this.UserId = UserData.AddNewUser(new UserDto(0, this.FirstName.Trim(), this.LastName.Trim(), this.UserName.Trim(),utiles.Utiles.ComputeSHA256Hash(this.PassWord.Trim()), this.ProfilePic, this.DateOfBirth,
                this.Gender, this.PhoneNumber, this.Email.Trim()));

            return (this.UserId != -1);
        }

        private bool UpdateUser()
        {
            return UserData.UpdateUser(new UserDto(this.UserId , this.FirstName.Trim(),this.LastName.Trim(), this.UserName,""
                ,this.ProfilePic , DateOfBirth, this.Gender, this.PhoneNumber,this.Email.Trim()));
        }

        public bool Save()
        {
            switch(Mode)
            {
                case EnMode.AddNew:
                    {
                        if (AddNewUser())
                        {
                            Mode = EnMode.Update;
                            return true;
                        }
                        return false;

                    }
                case EnMode.Update:
                    {
                        return UpdateUser();
                    }
                default:
                    return false;
            }
        }

        public static bool IsUserExistsByEmail(string Email)
        {
            return UserData.IsUserExistsByEmail(Email.Trim());
        }

        public static bool IsUserExistsByUserName(string UserName)
        {
            return UserData.IsUserExistsByUserName(UserName.Trim());
        }

        public static bool IsUserExistsByPhoneNumber(string PhoneNumber)
        {
            return UserData.IsUserExistsByPhoneNumber(PhoneNumber);
        }

        public bool ChangePassWord()
        {
            return UserData.ChangeUserPassWord(this.UserId, utiles.Utiles.ComputeSHA256Hash(this.PassWord.Trim()));
        }

        public static bool DeleteUserById(int UserId)
        {
            return UserData.DeleteUser(UserId);
        }

        public static List<UserDto> FilterUsersByUserName(string UserNameQuery)
        {
            return UserData.FilterUserByUserName(UserNameQuery.Trim());
            
        }
    }
}
