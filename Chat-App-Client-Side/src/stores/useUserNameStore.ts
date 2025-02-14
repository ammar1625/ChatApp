import { create } from "zustand";

interface userNameStore
{
    userNameQuery:string;
    setUserNameQuery:(query:string)=>void;
}

const useUserNameQueryStore =  create<userNameStore>(set=>({
    userNameQuery:"",
    setUserNameQuery:(query:string)=>set(()=>({userNameQuery:query}))
}))

export default useUserNameQueryStore;