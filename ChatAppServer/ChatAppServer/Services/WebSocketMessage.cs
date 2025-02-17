namespace ChatAppServer.Services
{
    public class WebSocketMessage
    {
        public int messageId { get; set; }
        public string messageContent { get; set; } = "";
        public DateTime sentAt { get; set; }
        public int conversationId { get; set; }
        public int senderId { get; set; }

        public WebSocketMessage(int messageId , string messageContent , DateTime sentAt ,int conversationId ,int senderId )
        {
            this.messageId = messageId ;
            this.messageContent = messageContent ;
            this.sentAt = sentAt ;
            this.conversationId = conversationId ;
            this.senderId = senderId ;
        }
    }
}
