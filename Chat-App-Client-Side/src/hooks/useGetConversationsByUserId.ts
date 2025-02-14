import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { userToFetch } from "./useLogIn";

export interface Conversation
{   
    conversationId:number;
    user1:number;
    user2:number;
    user_1 : userToFetch;
    user_2 : userToFetch;
}

function useGetConversationsByUserId(userId:number|undefined)
{
    function getConversations()
    {
        return apiClient.get<Conversation[]>(`/Conversations/UserId/${userId}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey:["conversations",userId],
        queryFn:getConversations,
        enabled:!!userId
    });
} 

export default useGetConversationsByUserId;