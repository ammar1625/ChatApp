import { useGetConversationByConversationId } from "../hooks/useGetConversationByConversationId";
import { IoSend } from "react-icons/io5";
import useSelectedConversationId from "../stores/useSelectedConversationIdStore";
import { useLogIn } from "../hooks/useLogIn";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { base64ToBlob } from "../utiles/utiles";
import male from "../images/user.jpg";
import {  useEffect, useRef, useState } from "react";
import useGetMessagesByConversation, { message } from "../hooks/useGetMessagesByConversation";
//import { useNavigate } from "react-router-dom";
import MessageSkeleton from "./MessageSkeleton";




interface currentConversationInfos
{
    userName:string|undefined;
    profilePic:string|null;
}
function MessagesPart()
{
  

    const messageFieldRef = useRef<HTMLInputElement>(null);
    const [messagesList , setMessagesList] = useState<message[]>([]);
    const webSocketRef = useRef<WebSocket | null>(null);
    const [inputMessage,setInputMessage] = useState("");
    const messagesCtrRef = useRef<HTMLDivElement>(null);
   
    const [currentConversationInfos,setCurrentConversatioInfos] = useState<currentConversationInfos>({userName:"", profilePic:""})

    const {selectedConevrsationId } = useSelectedConversationId();
    const {data:selectedConversation} = useGetConversationByConversationId(selectedConevrsationId);
    const {data:messages ,isLoading} = useGetMessagesByConversation(selectedConevrsationId);
    const {user} =useUserLogInInfos();
    const {data:currentUser} =useLogIn(user);
  
       useEffect(()=>{
        if(messages)
            {
                setMessagesList([...messages]);
                if(messagesCtrRef.current)
                {
                      messagesCtrRef.current.scrollTop = messagesCtrRef.current?.scrollHeight;
                     
                }
               
            }
    },[messages]);   

    
 

   

    useEffect(()=>{
        if (!selectedConevrsationId) return;

        webSocketRef.current = new WebSocket("ws://localhost:7890/messages");

        webSocketRef.current.onmessage = function(event)
        {
            const newMessage = JSON.parse(event.data);
            setMessagesList(prev=>[...prev,newMessage]); 
            setTimeout(()=>{
                if(messagesCtrRef.current)
                    {
                          messagesCtrRef.current.scrollTop = messagesCtrRef.current?.scrollHeight;
                         
                    }
            },500)      
        }

         // Clean up the WebSocket connection when the effect runs again or the component unmounts
        return () => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.close();
        }
        webSocketRef.current = null;
    };
    },[selectedConevrsationId]);

   
    function clearFields()
    {
        if(messageFieldRef.current)
        messageFieldRef.current.value ="";
    }
  

    const handleSendMessage = ()=> {
        if (!inputMessage.trim() || !selectedConevrsationId) return;

        const newMessage:message = {
            messageId:0,
            messageContent: inputMessage,
            conversationId : selectedConevrsationId,
            senderId : Number(currentUser?.userId),
            sentAt : new Date().toISOString()

        };
      
    
         if (webSocketRef.current?.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(newMessage));
            setInputMessage(''); 
            clearFields();
        } 
        
        } 
       
       
        
   
    useEffect(()=>{
        if(selectedConversation)
        {
            setCurrentConversatioInfos({...currentConversationInfos, 
                userName:Number(selectedConversation?.user1)!=Number(currentUser?.userId)?selectedConversation?.user_1.userName:selectedConversation?.user_2.userName,
                profilePic:Number(selectedConversation?.user1)!=Number(currentUser?.userId)?URL.createObjectURL(base64ToBlob( selectedConversation?.user_1.profilePic.image,selectedConversation?.user_1.profilePic.contentType)) :selectedConversation?.user_2.profilePic.image?URL.createObjectURL(base64ToBlob(selectedConversation.user_2.profilePic.image,selectedConversation.user_2.profilePic.contentType)):male
            })
        }
    },[selectedConversation]);


    function messagesSkeletons()
    {
        return  [1,2,3,4].map((m,i)=>i%2==0?<MessageSkeleton key={i} />:<MessageSkeleton key={i} isSent/>)
    }


    return <div className="massages-part">

           <div className="conversation current-convesation">
                <img className="conversation-img" src={currentConversationInfos.profilePic?currentConversationInfos.profilePic:male}/>
                <span className="conversation-user">{currentConversationInfos.userName}</span>
            </div>

            <div ref = {messagesCtrRef} className="messages-ctr">


                  { isLoading? messagesSkeletons():  messagesList?.map(m=> <div key={Number(m.messageId)} className={m.senderId===Number(currentUser?.userId)?"message-ctr":"message-ctr incoming-msg-ctr"}>
                    <p  className={m.senderId===Number(currentUser?.userId)?"message":"message incoming-message"}>{m.messageContent}</p>
                </div>)}  
               
            </div>

          

            <div className="message-field-ctr">
                <input ref={messageFieldRef}  className="message-field" type="text" onChange={(e)=>{
                    setInputMessage(e.target.value);
                   
                }}/>
                <button className="send-btn"><IoSend size={29} color="blue" onClick={handleSendMessage}/></button>
            </div>

            
    </div>
}

export default MessagesPart;