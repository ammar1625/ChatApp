import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { User } from "../stores/useUserLogInInfos";

export interface profilePic
{
    image:string;
    contentType:string;
}

export interface userToFetch
{
    userId:string;
    firstName:string;
    lastName:string;
    userName:string;
    passWord:string;
    dateOfBirth:string;
    gender:string;
    phoneNumber:string;
    email:string;
    isActive:boolean;
    profilePic:profilePic;
}


export function useLogIn(userinfos:User|null)
{
    function logIn()
    {
        if (!userinfos?.email || !userinfos?.passWord) {
            // Explicitly avoid running the query if credentials are missing
            return Promise.reject(new Error("Missing credentials"));
          }

       return apiClient.get<userToFetch>(`/Users/login?Email=${userinfos?.email}&PassWord=${userinfos?.passWord}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey: ["login", userinfos?.email, userinfos?.passWord],
        queryFn : logIn,
        enabled: !!userinfos?.email && !!userinfos?.passWord
    })
}