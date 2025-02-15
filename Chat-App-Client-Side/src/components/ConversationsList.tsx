import useGetConversationsByUserId from "../hooks/useGetConversationsByUserId";


import male from "../images/user.jpg";
import { base64ToBlob } from "../utiles/utiles";
import useSelectedConversationId from "../stores/useSelectedConversationIdStore";
import { useLogIn } from "../hooks/useLogIn";
import useUserLogInInfos from "../stores/useUserLogInInfos";


function ConversationsList()
{
    function skeletons()
           {
              
                return <div className="animate-pulse space-y-4 p-4 w-[100%]">
                
          
                {/* Conversation items */}
                {[1, 2, 3, 4, 5,6,7,8,9].map((i) => (
                  <div key={i} className="flex space-x-3 pt-1">
                    {/* Avatar skeleton */}
                    <div className="h-10 w-10 rounded-full bg-gray-400"></div>
          
                    {/* Message content skeleton */}
                    <div className="flex-1 space-y-2">
                      
                      <div className="space-y-1">
                        <div className="h-4 w-3/4 rounded bg-gray-400"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           }
    const {user } =  useUserLogInInfos();
        const {data:currentUser}= useLogIn(user)
    const {data:conversations ,isLoading} = useGetConversationsByUserId(Number(currentUser?.userId));

    const { setSelectedConversationId} = useSelectedConversationId();
    

  

    const handleConversationSelection = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetDiv = (e.target as HTMLElement).closest("div");
        setSelectedConversationId(Number(targetDiv?.dataset.id));
       
      };

    return <div className="conversations-list">
          {/*   <div className="conversation">
                <img className="conversation-img" src={img}/>
                <span className="conversation-user">Ammar</span>
            </div>

            <div className="conversation">
                <img className="conversation-img" src={img}/>
                <span className="conversation-user">Ammar</span>
            </div> */}

            {isLoading? skeletons(): conversations?.map(c=> <div key={c.conversationId} data-id={c.conversationId} className="conversation"
            onClick={handleConversationSelection}>
                 <img className="conversation-img" src={c.user1!=Number(currentUser?.userId)?URL.createObjectURL(base64ToBlob(c.user_1.profilePic.image,c.user_1.profilePic.contentType)) :c.user_2.profilePic.image?URL.createObjectURL(base64ToBlob(c.user_2.profilePic.image,c.user_2.profilePic.contentType)):male}/> 
              
                <span className="conversation-user">{c.user1!=Number(currentUser?.userId)?c.user_1.userName:c.user_2.userName}</span>
            </div>)}
           
              
    </div>
}

export default ConversationsList;

