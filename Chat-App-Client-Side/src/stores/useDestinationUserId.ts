import { create } from "zustand";

interface destinationUserIdStore
{
    destinationUserId:number;
    setDestinationUserId:(id:number)=>void;
}

const useDestinationUserId = create<destinationUserIdStore>(set=>({
    destinationUserId:0,
    setDestinationUserId:(id:number)=>set(()=>({destinationUserId:id}))
}));

export default useDestinationUserId;