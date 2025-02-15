import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export interface message
{
    messageId:number,
    messageContent:string|undefined;
    sentAt:Date;
    conversationId:number|undefined,
    senderId:number
}

function useGetMessagesByConversation(conversationId:number|undefined)
{
    function getMessages()
    {
       return apiClient.get<message[]>(`/Message/Messages/${conversationId}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey:["messages",conversationId],
        queryFn:getMessages,
        enabled:!!conversationId,
    });
}

export default useGetMessagesByConversation;