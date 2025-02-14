import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export function useIsConversationExists(currentUserId:number|undefined , destinationUserId:number|undefined)
{
    function isConversationExists()
    {
        return apiClient
        .get<boolean>(`/Conversations/isConversationExists?User1Id=${currentUserId}&User2Id=${destinationUserId}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey:["isConversationExists",currentUserId,destinationUserId],
        queryFn:isConversationExists,
        enabled:!!currentUserId && !!destinationUserId
    });
}