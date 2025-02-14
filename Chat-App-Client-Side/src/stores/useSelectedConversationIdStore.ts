import { create } from "zustand";

interface SelectedConversationId
{
    selectedConevrsationId:number|undefined;
    setSelectedConversationId:(id:number)=>void;
}

const useSelectedConversationId = create<SelectedConversationId>(set=>({
    selectedConevrsationId:0,
    setSelectedConversationId:(id:number)=>set(()=>({selectedConevrsationId:id}))
}));

export default useSelectedConversationId;