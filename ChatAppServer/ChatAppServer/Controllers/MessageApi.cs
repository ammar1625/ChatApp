using ChatAppBusinessLayer;
using ChatAppDataAccess.Dto_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ChatAppServer.Controllers
{
    [Route("api/Message")]
    [ApiController]
    public class MessageApi : ControllerBase
    {
        [HttpGet("Messages/{ConversationId}", Name = "MessagesList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetMessagesByConversationId(int ConversationId)
        {
            if (ConversationId == null || ConversationId <= 0)
                return BadRequest("invalid data");

            List<MessageDto> Messages = clsMessage.GetMessagesByConversationId(ConversationId);

            return Ok(Messages);
        }

        [HttpPost("AddNewMessage",Name ="AddMessage")]
        public IActionResult AddNewMessage(MessageDto message)
        {
            clsMessage Message = new clsMessage(new MessageDto(message.MessageId, message.MessageContent, message.SentAt, message.ConversationId,
                message.SenderId));

            if(Message.AddNewMessage())
            {
                return Ok(Message);
            }
            return StatusCode(500, "error");
        }
    }
    
}
