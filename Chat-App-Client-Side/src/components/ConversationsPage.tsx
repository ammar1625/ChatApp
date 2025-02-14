import ConversationsList from "./ConversationsList";
import MessagesPart from "./MessagesPart";

function ConversationsPage()
{
    return <div className="conversations-page-ctr">
        <ConversationsList/>
        <MessagesPart/>
    </div> 
    
}

export default ConversationsPage;