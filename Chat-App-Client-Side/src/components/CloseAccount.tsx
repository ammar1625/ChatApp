import { FaUser } from "react-icons/fa";
import * as CryptoJS from 'crypto-js';
import { CgPassword } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import useDeleteUser from "../hooks/useDeleteUser";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { useNavigate } from "react-router-dom";
import { useLogIn } from "../hooks/useLogIn";
function CloseAccount()
{
    const userNameInputRef = useRef<HTMLInputElement>(null);
    const passWordInputRef = useRef<HTMLInputElement>(null);
    const errorMsgRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();

    const [errorMsg,setErrorMsg] = useState("you must fill all the fields");

    const deleteUser = useDeleteUser();
    const {user,setUser} = useUserLogInInfos();
    const {data:currentUser} = useLogIn(user);

   // Function to hash a string using SHA-256
  function hashString(input: string): string {
    const hash = CryptoJS.SHA256(input); // Hash the input using SHA-256
    return hash.toString(CryptoJS.enc.Hex); // Convert the hash to a hex string and return it
  }
      

   

    function isValid()
    {
        let isValid = true;
        if(userNameInputRef.current && passWordInputRef.current)
        {
            if(!userNameInputRef.current.value || !passWordInputRef.current.value)
            {
                if(!userNameInputRef.current.value)
                    {
                        userNameInputRef.current.classList.add("invalid-input");
                        isValid=false;
                    }
                    else
                    {
                        userNameInputRef.current.classList.remove("invalid-input");
                    }
                    if(!passWordInputRef.current.value)
                        {
                            passWordInputRef.current.classList.add("invalid-input");
                            isValid=false;
                        }
                        else
                        {
                            passWordInputRef.current.classList.remove("invalid-input");
                        }
            }
            else
            {
                if(userNameInputRef.current.value != currentUser?.userName || 
                    hashString(passWordInputRef.current.value)!= currentUser.passWord)
                {
                    setErrorMsg("wrong credentials");
                    isValid=false;
                }
               
            }
          
            
            
        }

        return isValid;
    }

    function handleFieldsVAlidation()
    {
        let isFieldValid = true;
        if(!isValid())
        {
            isFieldValid = false;
            errorMsgRef.current?.classList.remove("invisible");
        }
        else
        {
            isFieldValid = true;
            errorMsgRef.current?.classList.add("invisible");
        }

        return isFieldValid;
    }

    function clearFields()
    {
        if(userNameInputRef.current && passWordInputRef.current)
        {
            userNameInputRef.current.value ="";
            passWordInputRef.current.value ="";
        }
        
    }

    function handleAccountDelete()
    {
        deleteUser.mutate({userName:userNameInputRef.current?.value , passWord:passWordInputRef.current?.value});
    }
    //this is to simulate log-out afetr account deletion
    useEffect(()=>{
        if(deleteUser.data != undefined)
        {
            if(deleteUser.data)
                {
                    setTimeout(()=>{
                        setUser({email:"",passWord:""});
                        navigate("/");
                    },3000);
                }
                /* else
                {
                    setErrorMsg("wrong credentials");
                } */
        }
       
    },[deleteUser.data]);

    function spinner()
    {
        return <div className="spinner"></div>
    }
    return <div className="login">
    <p className="title">close account</p>
    <form className="login-form" onSubmit={(e)=>{
        e.preventDefault();
        if(handleFieldsVAlidation())
        {
             handleAccountDelete();
             clearFields();
        }
        
    }}>


        <div className="field-ctr">

            <label className="field-label" >user name</label>

            <div className="input-ctr login-input-ctr">
                <FaUser size={23} color="#45556c" />
                <input ref={userNameInputRef} className="field-input " type="text" />
            </div>

        </div>

        <div  className="field-ctr">

        <label className="field-label" >password</label>

            <div className="input-ctr login-input-ctr" >
                <CgPassword size={23} color="#45556c"/>
                <input ref={passWordInputRef} className="field-input" type="password" />
            </div>

        </div>

        <p ref={errorMsgRef} className="error-msg invisible">{errorMsg}</p>

        <button className="login-btn close-account-btn">
            {deleteUser.isLoading?spinner():"close"}
        </button>
       
    </form>

</div>
}

export default CloseAccount;


