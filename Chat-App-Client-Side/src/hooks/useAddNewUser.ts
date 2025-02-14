import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export interface userToSend
{
    userId:number;
    firstName:string;
    lastName:string;
    userName:string;
    passWord:string;
    profilePic:File|null;
    dateOfBirth:Date;
    gender:string;
    phoneNumber:string;
    email:string;
    isActive:boolean
}

export function useAddNewUser()
{
    function addNewUser(newUser:userToSend)
    {
        const userFormData = new FormData();
        userFormData.append("UserId","0");
        userFormData.append("FirstName",newUser.firstName);
        userFormData.append("LastName",newUser.lastName);
        userFormData.append("UserName",newUser.userName);
        userFormData.append("PassWord",newUser.passWord);
        if(newUser.profilePic)
            {
                userFormData.append("ProfilePic",newUser.profilePic);
            }
        const formattedDate = new Date(newUser.dateOfBirth).toISOString();  // or another format that matches the backend's expectations
        userFormData.append("DateOfBirth", formattedDate);
        userFormData.append("Gender",newUser.gender);
        userFormData.append("PhoneNumber",newUser.phoneNumber);
        userFormData.append("Email",newUser.email);
        userFormData.append("IsActive",String(newUser.isActive));
        
       

        return apiClient.post<userToSend>('/Users/AddNewUser', userFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res=>res.data)
    }

   return useMutation<userToSend,Error,userToSend>({
        mutationFn:addNewUser
    });
}