import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { userToSend } from "./useAddNewUser";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { useNavigate } from "react-router-dom";

export function useUpdateUser()
{
    const {user,setUser}= useUserLogInInfos();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    function updateUser(params : {userId:number , updatedUser:userToSend} )
    {
        const userFormData = new FormData();
        userFormData.append("UserId","0");
        userFormData.append("FirstName",params.updatedUser.firstName);
        userFormData.append("LastName",params.updatedUser.lastName);
        userFormData.append("UserName",params.updatedUser.userName);
        userFormData.append("PassWord",params.updatedUser.passWord);
        if(params.updatedUser.profilePic)
            {
                userFormData.append("ProfilePic",params.updatedUser.profilePic);
            }
        
        const formattedDate = new Date(params.updatedUser.dateOfBirth).toISOString();  // or another format that matches the backend's expectations
        userFormData.append("DateOfBirth", formattedDate);
        userFormData.append("Gender",params.updatedUser.gender);
        userFormData.append("PhoneNumber",params.updatedUser.phoneNumber);
        userFormData.append("Email",params.updatedUser.email);
        userFormData.append("IsActive",String(params.updatedUser.isActive));
        
        return apiClient.put<userToSend>(`/Users/UpdateUser/UserId/${params.userId}`,userFormData,
            {
                headers: {
                  "Content-Type": "multipart/form-data", // Ensure the correct header for form-data
                },
              }
        )
        .then(res=>res.data);
    }

    return useMutation({
        mutationFn:updateUser,
        onSuccess:(savedUser)=>{
            queryClient.invalidateQueries({
                queryKey:["login",user?.email,user?.passWord]
            }); 

            setUser({email:savedUser.email,passWord:user?.passWord})
            setTimeout(() => {
                navigate("/main-page");
            }, 700);
            
          
        }
    })
}