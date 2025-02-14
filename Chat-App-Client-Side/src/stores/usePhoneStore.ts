import { create } from "zustand";

interface PhoneStore
{
    phoneQuery:string;
    setPhoneQuery:(phone:string)=>void;
}

const usePhoneStore = create<PhoneStore>(set=>({
    phoneQuery:"",
    setPhoneQuery:(phone:string)=>set(()=>({phoneQuery:phone}))
}))

export default usePhoneStore;