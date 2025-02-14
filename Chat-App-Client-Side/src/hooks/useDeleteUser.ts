import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";


function useDeleteUser()
{
    function deleteUser(params: {userName:string|undefined , passWord:string|undefined})
    {
        return apiClient.delete<boolean>(`/Users/DeleteUser/${params.userName},${params.passWord}`)
        .then(res=>res.data);
    }

    return useMutation({
        mutationFn:deleteUser,
        
    });
}

export default useDeleteUser;