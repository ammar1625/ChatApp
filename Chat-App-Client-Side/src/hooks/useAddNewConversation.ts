import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";



interface conversationToAdd
{
    conversationId:number;
    user1:number|undefined;
    user2:number|undefined;

}
function useAddNewConversation()
{
    const queryClient =  useQueryClient();
    function addConversation(conversationToAdd:conversationToAdd)
    {
         const formdata = new FormData();
        formdata.append("ConversationId",conversationToAdd.conversationId.toString()); 

        if(conversationToAdd.user1 && conversationToAdd.user2)
        {
            
            formdata.append("User1",conversationToAdd.user1.toString());
            formdata.append("User2",conversationToAdd.user2.toString());
         
        } 
       

       return apiClient.post<conversationToAdd>(`/Conversations/AddNewConversation`,formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res=>res.data);

    }

    return useMutation({
        mutationFn:addConversation,
        onSuccess:()=>{
        
         queryClient.invalidateQueries({
          queryKey:["conversations"]
         });
        }
    });
}

export default useAddNewConversation;