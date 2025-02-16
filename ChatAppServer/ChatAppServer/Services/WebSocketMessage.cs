namespace ChatAppServer.Services
{
    public class WebSocketMessage
    {
        public int MessageId { get; set; }
        public string MessageContent { get; set; } = "";
        public DateTime SentAt { get; set; }
        public int ConversationId { get; set; }
        public int SenderId { get; set; }
    }
}
