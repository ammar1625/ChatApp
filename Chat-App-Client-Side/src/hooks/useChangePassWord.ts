import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { userToSend } from "./useAddNewUser";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { useNavigate } from "react-router-dom";

function useChangePassWord()
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {user,setUser} = useUserLogInInfos();
    function changePassWord(params:{userId:number,newPassWord:string|undefined})
    {
       return apiClient.put<userToSend>(`/Users/ChangePassWord?UserId=${params.userId}&PassWord=${params.newPassWord}`)
        .then(res=>res.data);
    }

    return useMutation({
        mutationFn:changePassWord,
        onSuccess:(savedData)=>{
            queryClient.invalidateQueries({
                queryKey:["login",user?.email,user?.passWord]
            });

            setUser({email :user?.email , passWord:savedData.passWord});
            setTimeout(()=>{
                navigate("/main-page");
            },700)
        }
    });
}

export default useChangePassWord;