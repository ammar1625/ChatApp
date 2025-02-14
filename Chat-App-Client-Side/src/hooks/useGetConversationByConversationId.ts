import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Conversation } from "./useGetConversationsByUserId";

export function useGetConversationByConversationId(id:number|undefined)
{
    function getConversationById()
    {
        return apiClient.get<Conversation>(`/Conversations/conversationId/${id}`)
        .then(res=>res.data)
    }

    return useQuery({
        queryKey:["conversation","id",id],
        queryFn:getConversationById,
        enabled:!!id
    });
}