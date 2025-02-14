import { CgPassword } from "react-icons/cg";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";

import {  ChangeEvent, useRef, useState } from "react";

import male from "../images/user.jpg";
import female from "../images/woman-icon.jpg";
import { useAddNewUser } from "../hooks/useAddNewUser";
import { useNavigate } from "react-router-dom";
import useIsUserNameExists from "../hooks/useIsUserNameExists";
import useIsEmailExists from "../hooks/useIsEmailExists";
import useIsPhoneExists from "../hooks/useIsPhoneExists";
import useUserNameQueryStore from "../stores/useUserNameStore";
import usePhoneStore from "../stores/usePhoneStore";
import useEmailStore from "../stores/useEmailStore";
function CreateAccount()
{
    const profilePicRef = useRef<HTMLImageElement>(null);
    const profilePicInputRef = useRef<HTMLInputElement>(null);
    const profilePicLabelRef = useRef<HTMLLabelElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const LastNameInputRef = useRef<HTMLInputElement>(null);
    const UserNameInputRef = useRef<HTMLInputElement>(null);
    const PassWordInputRef = useRef<HTMLInputElement>(null);
    const DateOfBirthInputRef = useRef<HTMLInputElement>(null);
    const EmailInputRef = useRef<HTMLInputElement>(null);
    const MaleInputRef = useRef<HTMLInputElement>(null);
    const FemaleInputRef = useRef<HTMLInputElement>(null);
    const PhoneNumberInputRef = useRef<HTMLInputElement>(null);
    const ErrorMessageRef = useRef<HTMLParagraphElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const [errorMsg , setErrorMsg] = useState("all fields are required");
    const [isDisabled , setDisabled] = useState(true);
    const [gender,setGender] = useState("M");
    const [selectedPic ,setSelectedPic] = useState<File|null>();
    const [imagSrc,setImageSrc] = useState("");
   // const [emailQuery, setEmailQuery] = useState("");

    const addUser = useAddNewUser();
    
   const {userNameQuery , setUserNameQuery} =  useUserNameQueryStore();
   const {phoneQuery ,setPhoneQuery} = usePhoneStore();
   const {emailQuery ,setEmailQuery}= useEmailStore();

    const {data:email}=  useIsEmailExists(emailQuery.trim());
    const {data:phone}=  useIsPhoneExists(phoneQuery.trim());
    const {data:userName} = useIsUserNameExists( userNameQuery.trim());

    const navigate = useNavigate();
    
  

    function isValid():boolean
    {
        let isValid : boolean = true;
        if(firstNameInputRef.current)
            {
                if(!firstNameInputRef.current.value)
                    {
                        firstNameInputRef.current.classList.add("invalid-input");
                        isValid =  false;
                    }
                else
                {
                    firstNameInputRef.current.classList.remove("invalid-input");
                }
            }
            if(LastNameInputRef.current)
                {
                    if(!LastNameInputRef.current.value)
                        {
                            LastNameInputRef.current.classList.add("invalid-input");
                            isValid =  false;
                            
                        }
                    else
                    {
                        LastNameInputRef.current.classList.remove("invalid-input");
                    }
                }
                if(UserNameInputRef.current)
                    {
                        if(!UserNameInputRef.current.value)
                            {
                                UserNameInputRef.current.classList.add("invalid-input");
                                isValid =  false;

                            }
                        else
                        {
                            if(userName)
                                {
                                    UserNameInputRef.current?.classList.add("invalid-input");
                                    isValid = false;
                                    setErrorMsg("username is already taken by another user");
                                   
                                }
                            else
                            {
                                UserNameInputRef.current?.classList.remove("invalid-input");
                                setErrorMsg("all fields are required");
                            }
                            //UserNameInputRef.current.classList.remove("invalid-input");
                        }
                    }
                   
                        if(EmailInputRef.current)
                            {
                                if(!EmailInputRef.current.value)
                                    {
                                        EmailInputRef.current.classList.add("invalid-input");
                                        isValid =  false;

                                    }
                                else
                                {   
                                    if(email)
                                        {
                                            EmailInputRef.current?.classList.add("invalid-input");
                                            isValid = true;
                                            setErrorMsg("email is registred by another user");
                                        }
                                    else
                                    {
                                        EmailInputRef.current?.classList.remove("invalid-input");
                                        setErrorMsg("all fields are required");
                                    } 
                                    //EmailInputRef.current.classList.remove("invalid-input");
                                }
                            }
                            if(PassWordInputRef.current)
                                {
                                    if(!PassWordInputRef.current.value)
                                        {
                                            PassWordInputRef.current.classList.add("invalid-input");
                                            isValid =  false;
                                        }
                                    else
                                    {
                                        PassWordInputRef.current.classList.remove("invalid-input");
                                    }
                                }
                                if(DateOfBirthInputRef.current)
                                    {
                                        if(!DateOfBirthInputRef.current.value)
                                            {
                                                DateOfBirthInputRef.current.classList.add("invalid-input");
                                                isValid =  false;
                                            }
                                        else
                                        {
                                            DateOfBirthInputRef.current.classList.remove("invalid-input");
                                        }
                                    }
                                    if(PhoneNumberInputRef.current)
                                        {
                                            if(!PhoneNumberInputRef.current.value)
                                                {
                                                    PhoneNumberInputRef.current.classList.add("invalid-input");
                                                    isValid =  false;
                                                }
                                            else
                                            {
                                                if(phone)
                                                    {
                                                        PhoneNumberInputRef.current?.classList.add("invalid-input");
                                                        isValid = false;
                                                        setErrorMsg("phone number belongs to another user");
                                                    }
                                                else
                                                {
                                                    PhoneNumberInputRef.current?.classList.remove("invalid-input");
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
                    ErrorMessageRef.current?.classList.remove("invisible");
                    setDisabled(true);
                }
                else
                {
                    
                       ErrorMessageRef.current?.classList.add("invisible");
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
       
    }

    function clearFields()
    {
        if(firstNameInputRef.current && LastNameInputRef.current && UserNameInputRef.current && PassWordInputRef.current&&
            EmailInputRef.current && PhoneNumberInputRef.current && DateOfBirthInputRef.current && PhoneNumberInputRef.current
        )
        {
            
                    firstNameInputRef.current.value ="";
                    LastNameInputRef.current.value ="";
                    UserNameInputRef.current.value ="";
                    PassWordInputRef.current.value ="";
                    DateOfBirthInputRef.current.value ="";
                    EmailInputRef.current.value ="";
                    PhoneNumberInputRef.current.value = "";
                     
                    setSelectedPic(null);
                    setImageSrc("");
        }
    }

    function supressInvalidFiedsError()
    {
        if(firstNameInputRef.current && LastNameInputRef.current && UserNameInputRef.current && PassWordInputRef.current&&
            EmailInputRef.current && PhoneNumberInputRef.current && DateOfBirthInputRef.current && PhoneNumberInputRef.current
        )
        {
            firstNameInputRef.current.classList.remove("invalid-input");
                    LastNameInputRef.current.classList.remove("invalid-input");
                    UserNameInputRef.current.classList.remove("invalid-input");
                    PassWordInputRef.current.classList.remove("invalid-input");
                    DateOfBirthInputRef.current.classList.remove("invalid-input");
                    EmailInputRef.current.classList.remove("invalid-input");
                    PhoneNumberInputRef.current.classList.remove("invalid-input");
        }
    }

    function handleFormSubmit()
    {
        if(firstNameInputRef.current && LastNameInputRef.current && UserNameInputRef.current && PassWordInputRef.current&&
            EmailInputRef.current && PhoneNumberInputRef.current && DateOfBirthInputRef.current && PhoneNumberInputRef.current
        )
        {
            addUser.mutate(
                {
                    userId:0,
                    firstName:firstNameInputRef.current?.value,
                    lastName:LastNameInputRef.current?.value,
                    userName:UserNameInputRef.current?.value,
                    passWord:PassWordInputRef.current?.value,
                    profilePic:selectedPic?selectedPic:null,
                    dateOfBirth:new Date(DateOfBirthInputRef.current?.value),
                    email:EmailInputRef.current?.value,
                    phoneNumber:PhoneNumberInputRef.current?.value,
                    gender:gender,
                    isActive:true
                });

                clearFields();

                setTimeout(() => {
                    navigate("/");
                }, 2000);
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
                    if(profilePicRef.current)
                     setGender(e.target.value);
                }
        }

    return <div className="create-account">
        <p className="title">create account</p>
        
        <form className="login-form create-account-form" onSubmit={(e)=>{
            e.preventDefault();
           handleFormSubmit();
           supressInvalidFiedsError();

        }}>
        <div className="field-ctr">

        <label ref={profilePicLabelRef} htmlFor="pic-input" className="pic-label">
            upload a pic
        </label>

        <input ref={profilePicInputRef} accept="image/*" id="pic-input" className="hidden" type="file"
         onChange={handleProfilePic}/>
        <div className="img-ctr">
            <img ref={profilePicRef} className="profile-image" src={imagSrc ? imagSrc : gender==="M"?male:female}/>
            <a onClick={()=>setImageSrc("")} className={!imagSrc? "remove-pic-link invisible":"remove-pic-link"} href="#">remove picture</a>
        </div>

        </div>
        <div className="field-ctr">

        <label className="field-label" >first name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input ref = {firstNameInputRef} className="field-input" type="text" onChange={()=>{
               handleFieldsValidation();
            }} />
        </div>

        </div>
        <div className="field-ctr">

        <label className="field-label" >last name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input ref={LastNameInputRef} className="field-input" type="text" onChange={()=>{
                handleFieldsValidation();
            }}/>
        </div>

        </div>
        <div className="field-ctr">

        <label className="field-label" >user name</label>

        <div className="input-ctr">
            <FaUser size={23} color="#45556c" />
            <input ref={UserNameInputRef} className="field-input" type="text" onChange={(e)=>{
                setUserNameQuery(e.target.value);
            }} onKeyUp={()=>handleFieldsValidation()}/>
        </div>

        </div>

            <div className="field-ctr">

                <label className="field-label" >e-mail</label>

                <div className="input-ctr">
                    <MdOutlineAlternateEmail size={23} color="#45556c" />
                    <input ref ={EmailInputRef} className="field-input" type="email" onChange={(e)=>{
                    setEmailQuery(e.target.value)
            }}onKeyUp={()=>handleFieldsValidation()}/>
                </div>

            </div>

            <div  className="field-ctr">

            <label className="field-label" >password</label>

                <div className="input-ctr" >
                    <CgPassword size={23} color="#45556c"/>
                    <input ref={PassWordInputRef} className="field-input" type="password" onChange={()=>{
                handleFieldsValidation();
            }}/>
                </div>

            </div>
            <div className="field-ctr">

            <label className="field-label" >phone </label>

            <div className="input-ctr">
                <MdOutlinePhoneIphone size={23} color="#45556c" />
                <input ref={PhoneNumberInputRef} className="field-input" type="number" onChange={(e)=>{
                setPhoneQuery(e.target.value)
               
                
            }} 
            onKeyUp={()=>handleFieldsValidation()}/>
            </div>

            </div>

            <div className="field-ctr">

            <label className="field-label" >gender </label>

            <div className="input-ctr gender-ctr">
                <FaTransgender size={23} color="#45556c" />
                <div className="gender">
                    <label className="mr-2">male</label>
                    <input checked = {gender==="M"}  ref={MaleInputRef} name="gender" value="M" className="gender-input" type="radio" 
                    onChange={handleGenderChange}/>

                </div>
                <div className="gender">
                    <label className="mr-2">female</label>
                    <input  ref={FemaleInputRef} name="gender" value="F" className="gender-input" type="radio" 
                    onChange={handleGenderChange}/>

                </div>
            </div>

            </div>

            <div className="field-ctr">

            <label className="field-label" >birth date</label>

            <div className="input-ctr">
                <FaBirthdayCake size={23} color="#45556c" />
                <input ref={DateOfBirthInputRef} className="field-input" type="date" onChange={()=>{
                handleFieldsValidation();
            }}/>
            </div>

            </div>

            <p ref={ErrorMessageRef} className="error-msg invisible">{errorMsg}</p>

            <button disabled ={isDisabled} ref={submitBtnRef} className={isDisabled?"login-btn disabled-btn":"login-btn"}>
                {addUser.isLoading? spinner():"submit"}</button>

        </form>
    </div>
}

export default CreateAccount;