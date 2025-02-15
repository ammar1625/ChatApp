/* import img from "../images/chat-app.png" */
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgPassword } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidConversation } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogIn } from "../hooks/useLogIn";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { base64ToBlob } from "../utiles/utiles";
import male from "../images/user.jpg";
import female from "../images/woman-icon.jpg";
/* import useGetConversationsByUserId from "../hooks/useGetConversationsByUserId"; */

import { useUsersList } from "../hooks/useUsersList";
import useUserNameQueryStore from "../stores/useUserNameStore";
import useDestinationUserId from "../stores/useDestinationUserId";
import { useIsConversationExists } from "../hooks/useIsConversationExists";
import useAddNewConversation from "../hooks/useAddNewConversation";


/* interface logedInUser
{
    userName:string|undefined;
    profilePic:string|null;
    gender:string;
} */

interface elementsVisibility
{
    isNavBarMenueVisible:boolean;
    isUsersListVisible:boolean;
}
function MainPageNavBar()
{
    const navigate = useNavigate();
    const {user,setUser} =useUserLogInInfos();
    const {data:currentUser} =useLogIn(user)
    const {userNameQuery , setUserNameQuery} = useUserNameQueryStore();
    const {data:filteredUsersList} = useUsersList(userNameQuery);
   
    const {destinationUserId, setDestinationUserId} = useDestinationUserId();
    const {data:isConversationExists} = useIsConversationExists(Number(currentUser?.userId) , destinationUserId);
    const addConversation = useAddNewConversation();

   //const [logedinUser , setLogedInUser] =useState<logedInUser>({userName:"",profilePic:"",gender:""});
   const [areVisible , setVisible] = useState<elementsVisibility>({isNavBarMenueVisible:false,isUsersListVisible:false});
   const [isSelected, setIsSelected] = useState(true);
   const usersListRef = useRef<HTMLDivElement>(null);
  

  
    useEffect(() => {
        if (destinationUserId && typeof isConversationExists !== 'undefined') {
          if (isConversationExists) {
           // console.log("Conversation exists");
          } else {
           // console.log("Creating new conversation");
            addConversation.mutate({
              conversationId: 0,
              user1: Number(currentUser?.userId),
              user2: destinationUserId
            });
          }
        }
      }, [destinationUserId, isConversationExists]); // Add isConversationExists to dependencies
    function handleSearchInputChange(e:ChangeEvent<HTMLInputElement>)
    {
        if(!e.target.value)
        {
           setVisible({...areVisible , isUsersListVisible:false});
           setUserNameQuery(e.target.value);

        }
        else
        {
           setVisible({...areVisible , isUsersListVisible:true});
           setUserNameQuery(e.target.value);
        }
    }

    function handleSearchInputBlure(e:ChangeEvent<HTMLInputElement>)
    {
        setTimeout(() => {
            e.target.value="";
            setUserNameQuery("");
            setVisible({...areVisible , isUsersListVisible:false});
        }, 700);
     
    }

    const handleConversationCreation = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetDiv = (e.target as HTMLElement).closest("div");
        setDestinationUserId(Number(targetDiv?.dataset.userId));
        
      };

      function hideNavBarMenue()
      {
        setVisible({...areVisible,isNavBarMenueVisible:false});
      }

      function handleLogOut()
      {
        setTimeout(() => {
            setUser({email:"",passWord:""});
            navigate("/");
        }, (2500));
      }
    return <>
        <nav className="nav-bar main-page-nav-bar">

            <div className="logged-in-user-infos"onClick={hideNavBarMenue}>
                <img onClick={hideNavBarMenue} className="logged-in-user-image" src={currentUser?.profilePic?.image? URL.createObjectURL(base64ToBlob(currentUser?.profilePic?.image,currentUser?.profilePic?.contentType)) : currentUser?.gender=="M"? male:female}/>
                <span onClick={hideNavBarMenue} className="logged-in-user-name">{currentUser?.userName}</span>
            </div>

            <div className="search-input-ctr" onClick={hideNavBarMenue}>
                <button onClick={hideNavBarMenue} className="search-btn"><FaSearch size={26} color="#45556c"/></button>
                <input onClick={hideNavBarMenue} className="search-input" type="text" 
                onChange={handleSearchInputChange} 
                onBlur={handleSearchInputBlure} />
            </div>

            <button className="hamburger-menue"><GiHamburgerMenu size={23} color="#45556c"onClick={()=>{
                
                setVisible({...areVisible , isNavBarMenueVisible:!areVisible.isNavBarMenueVisible});
                
            }}/></button>

            <div onClick={hideNavBarMenue} ref={usersListRef} className={areVisible.isUsersListVisible?"users-to-find-ctr ":"users-to-find-ctr invisible"}>
                
              

                {filteredUsersList?.map(u=> u.userId!=currentUser?.userId && <div data-user-id={u.userId} key={u.userId} className="logged-in-user-infos user-to-find-infos"
                onClick={handleConversationCreation} >
                    <img onClick={hideNavBarMenue} className="logged-in-user-image" src={u.profilePic.image?URL.createObjectURL(base64ToBlob(u.profilePic.image,u.profilePic.contentType)):u.gender==="M"?male:female}/>
                    <span onClick={hideNavBarMenue} className="logged-in-user-name">{u.userName}</span>
                </div>)}
            </div>

            <div className={areVisible.isNavBarMenueVisible?"nav-bar-menue":"nav-bar-menue invisible"} >
                <NavLink  to="" className={isSelected?"menue-item selected":"menue-item"} onClick={()=>setIsSelected(true)}><span className="menue-icon"><BiSolidConversation size={18} color="#45556c"/></span> conversations</NavLink>
                <NavLink  to="/main-page/update" className={({isActive})=>isActive?"menue-item selected":"menue-item"} onClick={()=>setIsSelected(false)}><span className="menue-icon"><FaUser size={18} color="#45556c"/></span> update infos</NavLink>
                <NavLink  to="/main-page/changepassword" className={({isActive})=>isActive?"menue-item selected":"menue-item"} onClick={()=>setIsSelected(false)}><span className="menue-icon"><CgPassword size={18} color="#45556c"/></span> change password</NavLink>
                <NavLink  to="/main-page/closeaccount" className={({isActive})=>isActive?"menue-item selected":"menue-item"} onClick={()=>setIsSelected(false)}><span className="menue-icon"><MdDeleteForever size={18} color="red"/></span> close account</NavLink>
                <span  className="menue-item"
                onClick={handleLogOut}><span onClick={handleLogOut} className="menue-icon"><MdLogout size={18} color="red" onClick={handleLogOut}/></span > disconnect
                </span>
            </div>
        </nav>
    </>
}

export default MainPageNavBar;