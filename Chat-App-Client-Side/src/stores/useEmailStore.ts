import { create } from "zustand";

interface EmailStore
{
    emailQuery:string;
    setEmailQuery:(query:string)=>void;
}
const useEmailStore = create<EmailStore>(set=>({
    emailQuery:"",
    setEmailQuery:(quey:string)=>set(()=>({emailQuery:quey}))
}))

export default useEmailStore;