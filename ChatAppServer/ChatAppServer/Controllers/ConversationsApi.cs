using ChatAppBusinessLayer;
using ChatAppDataAccess;
using ChatAppDataAccess.Dto_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace ChatAppServer.Controllers
{
    [Route("api/Conversations")]
    [ApiController]
    public class ConversationsApi : ControllerBase
    {
        [HttpGet("conversationId/{ConversationId}",Name ="GetConversationById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetConversationById(int ConversationId)
        {
            if(ConversationId == null || ConversationId <=0)
                return BadRequest("invalid data");

            clsConversation Conversation = clsConversation.GetConversationById(ConversationId);
            if (Conversation == null)
                return NotFound($"conversation with id {ConversationId} is not found");


            string? Base64ImageUser1 = null;
            MemoryStream StreamUser1 = new MemoryStream();
            string? ContentTypeUser1 = null;

            string? Base64ImageUser2 = null;
            MemoryStream StreamUser2 = new MemoryStream();
            string? ContentTypeUser2 = null;

            if (Conversation.User_1.ProfilePic != null)
            {
                Conversation.User_1.ProfilePic.CopyTo(StreamUser1);

                byte[] ImageBytes = StreamUser1.ToArray();
                Base64ImageUser1 = Convert.ToBase64String(ImageBytes);
                ContentTypeUser1 = UserData.GetMimeType(Conversation.User_1.ProfilePic.FileName);
            }
            if (Conversation.User_2.ProfilePic != null)
            {
                Conversation.User_2.ProfilePic.CopyTo(StreamUser2);

                byte[] ImageBytes = StreamUser2.ToArray();
                Base64ImageUser2 = Convert.ToBase64String(ImageBytes);
                ContentTypeUser2 = UserData.GetMimeType(Conversation.User_2.ProfilePic.FileName);
            }

            var User1 = new
            {
                UserId = Conversation.User_1.UserId,
                FirstName = Conversation.User_1.FirstName,
                LastName = Conversation.User_1.LastName,
                UserName = Conversation.User_1.UserName,
                PassWord = Conversation.User_1.PassWord,
                DateOfBirth = Conversation.User_1.DateOfBirth,
                Gender = Conversation.User_1.Gender,
                Email = Conversation.User_1.Email,
                PhoneNumber = Conversation.User_1.PhoneNumber,
                IsActive = Conversation.User_1.IsActive,
                ProfilePic = new { Image = Base64ImageUser1, ContentType = ContentTypeUser1 }
            };

            var User2 = new
            {
                UserId = Conversation.User_2.UserId,
                FirstName = Conversation.User_2.FirstName,
                LastName = Conversation.User_2.LastName,
                UserName = Conversation.User_2.UserName,
                PassWord = Conversation.User_2.PassWord,
                DateOfBirth = Conversation.User_2.DateOfBirth,
                Gender = Conversation.User_2.Gender,
                Email = Conversation.User_2.Email,
                PhoneNumber = Conversation.User_2.PhoneNumber,
                IsActive = Conversation.User_2.IsActive,
                ProfilePic = new { Image = Base64ImageUser2, ContentType = ContentTypeUser2 }
            };

            //foreach(FileStream stream in UserData.Files)
            //{
            //    stream.Dispose();
            //    UserData.Files.Clear();

            //}


            return Ok(new 
            {
                ConversationId = Conversation.ConversationId,
                User1 = Conversation.User1,
                User2 = Conversation.User2,
                User_1 = User1,
                User_2 = User2,
                Messages = Conversation.Messages,
            });


         

        }

        [HttpGet("UserId/{UserId}", Name = "GetConversationByUserId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetConevrsationsByUserId(int UserId)
        {
            if (UserId == null || UserId <= 0)
                return BadRequest("invalid data");

            IEnumerable<ConversationDto> Conversations = clsConversation.GetConversationsByUserId(UserId);
            List<object> ConversationsWithNavigationProperties = new List<object>();

            string? Based64ImageUser1 = null;
            string ? ContentTypeUser1 = null;

            string? Based64ImageUser2 = null;
            string? ContentTypeUser2 = null;

            //handle users profile pics inside conversations list
            foreach (ConversationDto conversation in Conversations)
            {
                MemoryStream streamUser1 = new MemoryStream();

                MemoryStream streamUser2 = new MemoryStream();


                if (conversation.User_1.ProfilePic != null)
                {
                    conversation.User_1.ProfilePic.CopyTo(streamUser1);
                    byte[] imageBytes = streamUser1.ToArray();
                    Based64ImageUser1 = Convert.ToBase64String(imageBytes);
                    ContentTypeUser1 = UserData.GetMimeType(conversation.User_1.ProfilePic.FileName);
                    streamUser1.Dispose();
                }
                else
                {
                    Based64ImageUser1 = null;
                    ContentTypeUser1 = null;
                }
                    if (conversation.User_2.ProfilePic != null)
                    {
                        conversation.User_2.ProfilePic.CopyTo(streamUser2);
                        byte[] imageBytes = streamUser2.ToArray();
                        Based64ImageUser2 = Convert.ToBase64String(imageBytes);
                        ContentTypeUser2 = UserData.GetMimeType(conversation.User_2.ProfilePic.FileName);


                    streamUser2.Dispose();
                }
                else
                    {
                        Based64ImageUser2 = null;
                        ContentTypeUser2 = null;
                    }

                var user1 = new
                {
                    UserId = conversation.User_1.UserId,
                    FirstName = conversation.User_1.FirstName,
                    LastName = conversation.User_1.LastName,
                    UserName = conversation.User_1.UserName,
                    PassWord = conversation.User_1.PassWord,
                    DateOfBirth = conversation.User_1.DateOfBirth,
                    Gender = conversation.User_1.Gender,
                    Email = conversation.User_1.Email,
                    PhoneNumber = conversation.User_1.PhoneNumber,
                    IsActive = conversation.User_1.IsActive,
                    ProfilePic = new { Image = Based64ImageUser1, ContentType = ContentTypeUser1 }
                };

                var user2 = new
                {
                    UserId = conversation.User_2.UserId,
                    FirstName = conversation.User_2.FirstName,
                    LastName = conversation.User_2.LastName,
                    UserName = conversation.User_2.UserName,
                    PassWord = conversation.User_2.PassWord,
                    DateOfBirth = conversation.User_2.DateOfBirth,
                    Gender = conversation.User_2.Gender,
                    Email = conversation.User_2.Email,
                    PhoneNumber = conversation.User_2.PhoneNumber,
                    IsActive = conversation.User_2.IsActive,
                    ProfilePic = new { Image = Based64ImageUser2, ContentType = ContentTypeUser2 }
                };

                ConversationsWithNavigationProperties.Add(new
                    {
                        ConversationId = conversation.ConversationId,
                        User1 = conversation.User1,
                        User2 = conversation.User2,
                        User_1 = user1,
                        User_2 = user2

                    });


            }

            //foreach(FileStream stream in UserData.Files)
            //{
            //    stream.Dispose();
            //    UserData.Files.Clear();
            //}

            return Ok(ConversationsWithNavigationProperties);

        }

        [HttpPost("AddNewConversation",Name ="AddConversation")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddNewConversation([FromForm] ConversationModel NewConversation)
        {
            if (NewConversation.User1 <= 0 || NewConversation.User1 == null || NewConversation.User2 <= 0 || NewConversation.User2 == null)
                return BadRequest("invalid data");

            clsConversation Conversation = new clsConversation(new ConversationModel(NewConversation.ConversationId,
                NewConversation.User1, NewConversation.User2));

            if (Conversation.AddNewConversaTion())
            {
                return CreatedAtRoute("GetConversationById", new { ConversationId = Conversation.ConversationId }, new ConversationModel(NewConversation.ConversationId , NewConversation.User1,NewConversation.User2));
            }
            else
                return StatusCode(500, "internal server");
        }

        [HttpGet("isConversationExists",Name ="isExists")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsConversationExists(int User1Id , int User2Id)
        {
            if (User1Id == null || User2Id == null)
                return BadRequest("invalid data");

            bool isExists = clsConversation.IsConversationExists(User1Id, User2Id);

            return Ok(isExists);

        }
    }
}
