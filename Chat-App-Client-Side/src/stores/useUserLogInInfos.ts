import { create } from "zustand";

export interface User
{
    email:string|undefined;
    passWord:string|undefined;
}
export interface userLogInInfos
{ 
    user:User|null,
    setUser:(UserInfos:User|null)=>void,
}

const useUserLogInInfos = create<userLogInInfos>(set=>({
 user:null,
 setUser:(UserInfos:User|null)=>set(()=>({user:UserInfos}))
}))

export default useUserLogInInfos;