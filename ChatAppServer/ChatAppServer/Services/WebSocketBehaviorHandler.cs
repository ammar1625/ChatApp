using ChatAppBusinessLayer;
using System.Threading.Tasks.Dataflow;
using WebSocketSharp;
using WebSocketSharp.Server;
using Newtonsoft.Json;
using ChatAppDataAccess.Dto_s;

namespace ChatAppServer.Services
{
    public class WebSocketBehaviorHandler : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            //deserialize the incoming message from the server
            var DeserliazedMessage = JsonConvert.DeserializeObject<MessageDto>(e.Data); 

            ////create a new message instance
            clsMessage NewMessage = new clsMessage(new MessageDto(DeserliazedMessage.MessageId, DeserliazedMessage.MessageContent, DeserliazedMessage.SentAt,
                DeserliazedMessage.ConversationId, DeserliazedMessage.SenderId));

            ////perform message addition to the data base
            NewMessage.AddNewMessage();

            //create a new websocketmessage object and serialize it to match the message interface in the front-end and serialize it with its new id 
            var serialzedMessage = JsonConvert.SerializeObject(new WebSocketMessage(NewMessage.MessageId,NewMessage.MessageContent,
                NewMessage.SentAt,NewMessage.ConversationId,NewMessage.SenderId));
            //send the new messages to the clients

            Sessions.Broadcast(serialzedMessage);
           // Sessions.Broadcast(e.Data);

            
        }

        
    }
}
