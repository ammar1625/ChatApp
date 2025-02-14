using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatAppDataAccess.Dto_s
{
    public class ConversationDto
    {
        public int ConversationId { get; set; }
        public int User1 { get; set; }
        public int User2 { get; set; }

        public UserDto? User_1 { get; set; }
        public UserDto? User_2 { get; set; }

        public List<MessageDto>? Messages { get; set; }

        public ConversationDto()
        {
        }
        public ConversationDto(int ConversationId , int User1 , int User2)
        {
            this.ConversationId = ConversationId;
            this.User1 = User1;
            this.User2 = User2;
            this.User_1 = new UserDto();
            this.User_2 = new UserDto();
            this.Messages = new List<MessageDto>();
        }
    }
}
