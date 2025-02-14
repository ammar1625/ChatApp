
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useIsUserNameExists from "../hooks/useIsUserNameExists";
import usePhoneStore from "../stores/usePhoneStore";
import useEmailStore from "../stores/useEmailStore";
import useUserNameQueryStore from "../stores/useUserNameStore";
import useIsEmailExists from "../hooks/useIsEmailExists";
import useIsPhoneExists from "../hooks/useIsPhoneExists";


import male from "../images/user.jpg";
import female from "../images/woman-icon.jpg";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { useLogIn, userToFetch } from "../hooks/useLogIn";
import { base64ToBlob } from "../utiles/utiles";
import { useUpdateUser } from "../hooks/useUpdateUser";
function UpdateUserInfos()
{
        const profilePicref = useRef<HTMLImageElement>(null);
        const profilePicInputref = useRef<HTMLInputElement>(null);
        //const profilePicLabelRef = useRef<HTMLLabelElement>(null);
        const firstNameInputref = useRef<HTMLInputElement>(null);
        const LastNameInputref = useRef<HTMLInputElement>(null);
        const UserNameInputref = useRef<HTMLInputElement>(null);
        const PassWordInputref = useRef<HTMLInputElement>(null);
        const DateOfBirthInputref = useRef<HTMLInputElement>(null);
        const EmailInputref = useRef<HTMLInputElement>(null);
        /* const MaleInputRef = useRef<HTMLInputElement>(null);
        const FemaleInputRef = useRef<HTMLInputElement>(null); */
        const PhoneNumberInputref = useRef<HTMLInputElement>(null);
        const ErrorMessageref = useRef<HTMLParagraphElement>(null);
        //const submitBtnRef = useRef<HTMLButtonElement>(null);


        const [currentUserInfos, setCurrentUserInfos] = useState<userToFetch>();
        const [errorMsg , setErrorMsg] = useState("all fields are required");
        const [isDisabled , setDisabled] = useState(false);
        const [gender,setGender] = useState("M");
        
        const [hasPicChanged, setHasPicChanged] = useState(false);
                
        const {userNameQuery , setUserNameQuery} =  useUserNameQueryStore();
        const {phoneQuery ,setPhoneQuery} = usePhoneStore();
        const {emailQuery ,setEmailQuery}= useEmailStore();

        const {data:email}=  useIsEmailExists(emailQuery.trim());
        const {data:phone}=  useIsPhoneExists(phoneQuery.trim());
        const {data:userName} = useIsUserNameExists( userNameQuery.trim());
        const {user} =  useUserLogInInfos();
        const {data:currentUser}= useLogIn(user)
        const updateUser = useUpdateUser();
        const [imagSrc,setImageSrc] = useState(currentUser?.profilePic?.image?URL.createObjectURL(base64ToBlob(currentUser?.profilePic?.image,currentUser?.profilePic?.contentType)):"");
        const [selectedPic ,setSelectedPic] = useState<File|null>(currentUser?.profilePic.image?new File([base64ToBlob(currentUser?.profilePic?.image,currentUser?.profilePic?.contentType)],' ',{type:currentUser.profilePic.contentType}):null);
        
      
            
          useEffect(()=>{
            if(UserNameInputref.current)
                {
                    if(!UserNameInputref.current.value)
                        {
                            //UserNameInputRef.current.classList.add("invalid-input");
                            //isValid =  false;

                        }
                    else
                    {
                        if(userName  && UserNameInputref.current.value !== currentUser?.userName)
                            {
                                UserNameInputref.current?.classList.add("invalid-input");
                               // isValid = false;
                                setErrorMsg("username is already taken by another user");
                               
                            }
                        else
                        {
                            UserNameInputref.current?.classList.remove("invalid-input");
                            setErrorMsg("all fields are required");
                        }
                        //UserNameInputRef.current.classList.remove("invalid-input");
                    }
                }

            
                if(EmailInputref.current)
                    {
                        if(!EmailInputref.current.value)
                            {
                               // EmailInputRef.current.classList.add("invalid-input");
                               // isValid =  false;

                            }
                        else
                        {   
                            if(email && EmailInputref.current.value !== currentUser?.email)
                                {
                                    EmailInputref.current?.classList.add("invalid-input");
                                   // isValid = true;
                                    setErrorMsg("email is registred by another user");
                                }
                            else
                            {
                                EmailInputref.current?.classList.remove("invalid-input");
                                setErrorMsg("all fields are required");
                            } 
                            //EmailInputRef.current.classList.remove("invalid-input");
                        }
                    }

                    if(PhoneNumberInputref.current)
                        {
                            if(!PhoneNumberInputref.current.value)
                                {
                                    //PhoneNumberInputRef.current.classList.add("invalid-input");
                                   // isValid =  false;
                                }
                            else
                            {
                                if(phone && PhoneNumberInputref.current.value != currentUser?.phoneNumber)
                                    {
                                        PhoneNumberInputref.current?.classList.add("invalid-input");
                                        //isValid = false;
                                        setErrorMsg("phone number belongs to another user");
                                    }
                                else
                                {
                                    PhoneNumberInputref.current?.classList.remove("invalid-input");
                                    setErrorMsg("all fields are required");
                                }
                               // PhoneNumberInputRef.current.classList.remove("invalid-input");
                            }
                        }
          },[userName,email,phone])

          useEffect(()=>{
            console.log(currentUser);
          },[currentUser])

          useEffect(()=>{
            console.log(user);
          },[user])
          useEffect(()=>{
            if(currentUser)
            {
                setCurrentUserInfos({
                    userId:currentUser.userId,
                    firstName:currentUser.firstName,
                    lastName:currentUser.lastName,
                    userName:currentUser.userName,
                    passWord:currentUser.passWord,
                    email:currentUser.email,
                    phoneNumber:currentUser.phoneNumber,
                    gender:currentUser.gender,
                    dateOfBirth:currentUser.dateOfBirth,
                    isActive:currentUser.isActive,
                    profilePic:
                    {
                        image:currentUser.profilePic?.image,
                        contentType:currentUser.profilePic?.contentType
                    }
                })
            }
          },[currentUser]);
        
            function isValid():boolean
            {
                let isValid : boolean = true;
                if(firstNameInputref.current)
                    {
                        if(!firstNameInputref.current.value)
                            {
                                firstNameInputref.current.classList.add("invalid-input");
                                isValid =  false;
                            }
                        else
                        {
                            firstNameInputref.current.classList.remove("invalid-input");
                        }
                    }
                    if(LastNameInputref.current)
                        {
                            if(!LastNameInputref.current.value)
                                {
                                    LastNameInputref.current.classList.add("invalid-input");
                                    isValid =  false;
                                    
                                }
                            else
                            {
                                LastNameInputref.current.classList.remove("invalid-input");
                            }
                        }
                        if(UserNameInputref.current)
                            {
                                if(!UserNameInputref.current.value)
                                    {
                                        UserNameInputref.current.classList.add("invalid-input");
                                        isValid =  false;
        
                                    }
                                else
                                {
                                    if(userName  && UserNameInputref.current.value !== currentUser?.userName)
                                        {
                                            UserNameInputref.current?.classList.add("invalid-input");
                                            isValid = false;
                                            setErrorMsg("username is already taken by another user");
                                           
                                        }
                                    else
                                    {
                                        UserNameInputref.current?.classList.remove("invalid-input");
                                        setErrorMsg("all fields are required");
                                    }
                                    //UserNameInputRef.current.classList.remove("invalid-input");
                                }
                            }
                           
                                if(EmailInputref.current)
                                    {
                                        if(!EmailInputref.current.value)
                                            {
                                                EmailInputref.current.classList.add("invalid-input");
                                                isValid =  false;
        
                                            }
                                        else
                                        {   
                                            if(email && EmailInputref.current.value !== currentUser?.email)
                                                {
                                                    EmailInputref.current?.classList.add("invalid-input");
                                                    isValid = true;
                                                    setErrorMsg("email is registred by another user");
                                                }
                                            else
                                            {
                                                EmailInputref.current?.classList.remove("invalid-input");
                                                setErrorMsg("all fields are required");
                                            } 
                                            //EmailInputRef.current.classList.remove("invalid-input");
                                        }
                                    }
                                    if(PassWordInputref.current)
                                        {
                                            if(!PassWordInputref.current.value)
                                                {
                                                    PassWordInputref.current.classList.add("invalid-input");
                                                    isValid =  false;
                                                }
                                            else
                                            {
                                                PassWordInputref.current.classList.remove("invalid-input");
                                            }
                                        }
                                        if(DateOfBirthInputref.current)
                                            {
                                                if(!DateOfBirthInputref.current.value)
                                                    {
                                                        DateOfBirthInputref.current.classList.add("invalid-input");
                                                        isValid =  false;
                                                    }
                                                else
                                                {
                                                    DateOfBirthInputref.current.classList.remove("invalid-input");
                                                }
                                            }
                                            if(PhoneNumberInputref.current)
                                                {
                                                    if(!PhoneNumberInputref.current.value)
                                                        {
                                                            PhoneNumberInputref.current.classList.add("invalid-input");
                                                            isValid =  false;
                                                        }
                                                    else
                                                    {
                                                        if(phone && PhoneNumberInputref.current.value != currentUser?.phoneNumber)
                                                            {
                                                                PhoneNumberInputref.current?.classList.add("invalid-input");
                                                                isValid = false;
                                                                setErrorMsg("phone number belongs to another user");
                                                            }
                                                        else
                                                        {
                                                            PhoneNumberInputref.current?.classList.remove("invalid-input");
                                                            setErrorMsg("all fields are required");
                                                        }
                                                       // PhoneNumberInputRef.current.classList.remove("invalid-input");
                                                    }
                                                }
                                                                          
                                    
                        return isValid;
            }
        
            function handleFieldsValidation()
            {
                
                    if(!isValid())
                        {
                            ErrorMessageref.current?.classList.remove("invisible");
                            setDisabled(true);
                        }
                        else
                        {
                            
                               ErrorMessageref.current?.classList.add("invisible");
                               setDisabled(false);        
                        }
                    
                 
             
            }
        
            function handleProfilePic(e:ChangeEvent<HTMLInputElement>)
            {
                
                const file =  e.target.files?.[0]
                if(file)
                    {
                         setImageSrc(URL.createObjectURL(file));
                         setSelectedPic(file); 
                       
                    }
                    URL.revokeObjectURL(imagSrc);
                    e.target.value = "";
                    setHasPicChanged(true);
               
            }
        
            function clearFields()
            {
                if(firstNameInputref.current && LastNameInputref.current && UserNameInputref.current&&
                    EmailInputref.current && PhoneNumberInputref.current && DateOfBirthInputref.current && PhoneNumberInputref.current
                )
                {
                    
                            firstNameInputref.current.value ="";
                            LastNameInputref.current.value ="";
                            UserNameInputref.current.value ="";
                        
                            DateOfBirthInputref.current.value ="";
                            EmailInputref.current.value ="";
                            PhoneNumberInputref.current.value = "";
                             
                            setSelectedPic(null);
                            setImageSrc("");
                }
            }
        
            function supressInvalidFiedsError()
            {
                if(firstNameInputref.current && LastNameInputref.current && UserNameInputref.current && PassWordInputref.current&&
                    EmailInputref.current && PhoneNumberInputref.current && DateOfBirthInputref.current && PhoneNumberInputref.current
                )
                {
                    firstNameInputref.current.classList.remove("invalid-input");
                            LastNameInputref.current.classList.remove("invalid-input");
                            UserNameInputref.current.classList.remove("invalid-input");
                            PassWordInputref.current.classList.remove("invalid-input");
                            DateOfBirthInputref.current.classList.remove("invalid-input");
                            EmailInputref.current.classList.remove("invalid-input");
                            PhoneNumberInputref.current.classList.remove("invalid-input");
                }
            }
        
            function handleFormSubmit()
            {
                if(firstNameInputref.current && LastNameInputref.current && UserNameInputref.current &&
                    EmailInputref.current && PhoneNumberInputref.current && DateOfBirthInputref.current && PhoneNumberInputref.current
                )
                {
                    updateUser.mutate(
                        {userId : Number(currentUser?.userId),
                         updatedUser : 
                         {
                            userId:0,
                            firstName:firstNameInputref.current?.value,
                            lastName:LastNameInputref.current?.value,
                            userName:UserNameInputref.current?.value,
                            passWord:"*",
                            profilePic:selectedPic?selectedPic:null,
                            dateOfBirth:new Date(DateOfBirthInputref.current?.value),
                            email:EmailInputref.current?.value,
                            phoneNumber:PhoneNumberInputref.current?.value,
                            gender:gender,
                            isActive:true
                         }
                           
                        });
        
                        /* if(currentUser)
                        setUser({passWord:user?.passWord,email:EmailInputref.current.value }) ; */
                        clearFields();
                        
                      /*   setTimeout(() => {
                            navigate("/");
                        }, 2000); */
                }
               
            }
        
             function spinner()
            {
                return <div className="spinner"></div>
            }

            function handleGenderChange(e:ChangeEvent<HTMLInputElement>)
            {
                if(e.target.checked)
                    {
                        if(profilePicref.current)
                         setGender(e.target.value);
                    }
            }

            function profilePicSrc():string
            {
                if(!hasPicChanged)
                {
                    if(currentUser?.profilePic?.image)
                    {
                        return URL.createObjectURL(base64ToBlob(currentUser?.profilePic?.image,currentUser?.profilePic?.contentType));
                    }
                    else
                    {
                        if(currentUserInfos?.gender==="M")
                        {
                            return male;
                        }
                        else
                        {
                            return female;
                        }
                    }

                }
                else
                {
                    
                if(imagSrc )
                 {
                    return imagSrc;
                 }

                  
                    else
                    {
                        if(gender==="M")
                        {
                            return male;
                        }
                        else
                        {
                            return female;
                        }
                    }
                }
            }

            function picLinkClassName():string 
            {
                if(!hasPicChanged)
                {
                    if(currentUser?.profilePic?.image || imagSrc)
                        {
                            return "remove-pic-link";
                        }
                    else
                    {
                        return "remove-pic-link invisible";
                    }
                }
               
                else
                {
                    if(imagSrc)
                    {
                        return "remove-pic-link";
                    }
                    else
                    {
                        return "remove-pic-link invisible";
                    }
                }
            }
        
    return <div className="create-account">
        <p className="title">update infos</p>
        <form className="login-form create-account-form"onSubmit={(e)=>{
            e.preventDefault();
            handleFormSubmit();
            supressInvalidFiedsError();
            
        }}>
        <div className="field-ctr">

        <label  htmlFor="pic-input" className="pic-label">
            upload a pic
        </label>

        <input ref={profilePicInputref} accept="image/*" id="pic-input" className="hidden" type="file"
         onChange={handleProfilePic}/>
        <div className="img-ctr">
            <img ref={profilePicref} className="profile-image" src={profilePicSrc()}/>
            <a onClick={()=>
                {setImageSrc("");
                 setHasPicChanged(true); 
                 setSelectedPic(null);  
                }} className={picLinkClassName()} href="#">remove picture</a>
        </div>
        </div>

        <div className="field-ctr">

        <label className="field-label" >first name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input placeholder={currentUser?.firstName} ref={firstNameInputref} className="field-input" type="text" onChange={()=>{
                handleFieldsValidation();
            }} />
        </div>

        </div>
        <div className="field-ctr">

        <label className="field-label" >last name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input placeholder={currentUser?.lastName} ref={LastNameInputref} className="field-input" type="text" onChange={()=>{
                handleFieldsValidation();
            }}/>
        </div>

        </div>
        <div className="field-ctr">

        <label className="field-label" >user name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input placeholder={currentUser?.userName} ref={UserNameInputref} className="field-input" type="text" onChange={(e)=>{
                setUserNameQuery(e.target.value);
            }} onKeyUp={handleFieldsValidation}/>
        </div>

        </div>

            <div className="field-ctr">

                <label className="field-label" >e-mail</label>

                <div className="input-ctr">
                    <MdOutlineAlternateEmail size={23} color="#45556c" />
                    <input placeholder={currentUser?.email} ref={EmailInputref} className="field-input" type="email" onChange={(e)=>{
                setEmailQuery(e.target.value);
            }} onKeyUp={handleFieldsValidation}/>
                </div>

            </div>

            
            <div className="field-ctr">

            <label className="field-label" >phone </label>

            <div className="input-ctr">
                <MdOutlinePhoneIphone size={23} color="#45556c" />
                <input placeholder={currentUser?.phoneNumber} ref={PhoneNumberInputref} className="field-input" type="number" onChange={(e)=>{
                setPhoneQuery(e.target.value);
            }}onKeyUp={handleFieldsValidation}/>
            </div>

            </div>

            <div className="field-ctr">

            <label className="field-label" >gender </label>

            <div className="input-ctr gender-ctr">
                <FaTransgender size={23} color="#45556c" />
                <div className="gender">
                    <label className="mr-2">male</label>
                    <input name="gender" checked = {currentUser?.gender==="M"} value="M" className="gender-input" type="radio" 
                    onChange={handleGenderChange}/>

                </div>
                <div className="gender">
                    <label className="mr-2">female</label>
                    <input checked={currentUser?.gender==="F"} name="gender" value="F" className="gender-input" type="radio" 
                    onChange={handleGenderChange}/>

                </div>
            </div>

            </div>

            <div className="field-ctr">

            <label className="field-label" >birth date</label>

            <div className="input-ctr">
                <FaBirthdayCake size={23} color="#45556c" />
                <input placeholder={currentUser?.dateOfBirth?.slice(0,10)} ref={DateOfBirthInputref} className="field-input" type="date" onChange={()=>{
                handleFieldsValidation();
            }}/>
            </div>

            </div>

            <p ref={ErrorMessageref} className="error-msg invisible">{errorMsg}</p>

            <button disabled= {isDisabled} className={isDisabled?"login-btn disabled-btn":"login-btn"}>
                {updateUser.isLoading?spinner():"update"}
            </button>

        </form>
    </div>
}

export default UpdateUserInfos;