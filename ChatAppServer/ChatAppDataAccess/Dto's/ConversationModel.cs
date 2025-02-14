namespace ChatAppServer
{
    public class ConversationModel
    {
        public int ConversationId { get; set; }
        public int User1 { get; set; }
        public int User2 { get; set; }

        public ConversationModel()
        {
        }
        public ConversationModel(int ConversationId, int User1, int User2)
        {
            this.ConversationId = ConversationId;
            this.User1 = User1;
            this.User2 = User2;
        }
    }
}
