import { useGetConversationByConversationId } from "../hooks/useGetConversationByConversationId";
import { IoSend } from "react-icons/io5";
import useSelectedConversationId from "../stores/useSelectedConversationIdStore";
import { useLogIn } from "../hooks/useLogIn";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { base64ToBlob } from "../utiles/utiles";
import male from "../images/user.jpg";
import { useEffect, useState } from "react";

interface currentConversationInfos
{
    userName:string|undefined;
    profilePic:string|null;
}
function MessagesPart()
{
    const [currentConversationInfos,setCurrentConversatioInfos] = useState<currentConversationInfos>({userName:"", profilePic:""})

    const {selectedConevrsationId } = useSelectedConversationId();
    const {data:selectedConversation} = useGetConversationByConversationId(selectedConevrsationId);

    const {user} =useUserLogInInfos();
    const {data:currentUser} =useLogIn(user);

    useEffect(()=>{
        if(selectedConversation)
        {
            setCurrentConversatioInfos({...currentConversationInfos, 
                userName:Number(selectedConversation?.user1)!=Number(currentUser?.userId)?selectedConversation?.user_1.userName:selectedConversation?.user_2.userName,
                profilePic:Number(selectedConversation?.user1)!=Number(currentUser?.userId)?URL.createObjectURL(base64ToBlob( selectedConversation?.user_1.profilePic.image,selectedConversation?.user_1.profilePic.contentType)) :selectedConversation?.user_2.profilePic.image?URL.createObjectURL(base64ToBlob(selectedConversation.user_2.profilePic.image,selectedConversation.user_2.profilePic.contentType)):male
            })
        }
    },[selectedConversation])
    return <div className="massages-part">

           <div className="conversation current-convesation">
                <img className="conversation-img" src={currentConversationInfos.profilePic?currentConversationInfos.profilePic:male}/>
                <span className="conversation-user">{currentConversationInfos.userName}</span>
            </div>

            <div className="messages-ctr">

                <div className="message-ctr incoming-msg-ctr">
                    <p className="message incoming-message">hello</p>
                </div>

                <div className="message-ctr">
                    <p className="message">hello how are you my name is Ammar and
                         i am a full stack web developer and i am from algeria and i am 32 years old and i live in constantine
                    </p>
                    
                </div>

                <div className="message-ctr">
                    <p className="message">hello how are you my name is Ammar and
                         i am a full stack web developer and i am from algeria and i am 32 years old and i live in constantine
                    </p>
                    
                </div>

                <div className="message-ctr incoming-msg-ctr">
                    <p className="message incoming-message">wow ! sounds great nice to meet you</p>
                </div>
               
            </div>

            <div className="message-field-ctr">
                <input className="message-field" type="text"/>
                <button className="send-btn"><IoSend size={29} color="blue"/></button>
            </div>
    </div>
}

export default MessagesPart;