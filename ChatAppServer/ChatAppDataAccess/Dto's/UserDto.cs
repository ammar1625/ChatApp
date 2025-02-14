using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.Dto_s
{
    public class UserDto
    {
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
        public List<MessageDto>?Messages { get; set; }
        public List<ConversationDto>? ConversationsAsUser1 { get; set; }
        public List<ConversationDto>? ConversationsAsUser2 { get; set; }

        public UserDto()
        {

        }
        public UserDto(int UserId , string FirstName , string LastName , string UserName , string PassWord , IFormFile ProfilePic 
            ,DateTime DateOfBirth , char? Gender , string PhoneNumber , string Email , bool IsActive = true )
        {
            this.UserId = UserId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.UserName = UserName;
            this.PassWord = PassWord;
            this.ProfilePic = ProfilePic;
            this.DateOfBirth = DateOfBirth;
            this.Gender = Gender;
            this.PhoneNumber = PhoneNumber;
            this.Email = Email;
            this.IsActive = IsActive;
            this.Messages = new List<MessageDto>();
            this.ConversationsAsUser1 = new List<ConversationDto>();
            this.ConversationsAsUser2 = new List<ConversationDto>();
        }
    }
}
