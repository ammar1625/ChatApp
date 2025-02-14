import { MdOutlineAlternateEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import {  useRef, useState , useEffect } from "react";
import { useLogIn } from "../hooks/useLogIn";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import { useNavigate } from "react-router-dom";

//import { base64ToBlob } from "../utiles/utiles";
function Login()
{
    const navigate =  useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passWordInputRef = useRef<HTMLInputElement>(null);
    const errorMsgRef = useRef<HTMLParagraphElement>(null);

    const [isLogingIn , setIsLogingIn] = useState(false);
    const [errorMsg ,setErrorMsg] = useState("you should enter your log-in infos");
    const {user , setUser} = useUserLogInInfos();
    const {data:currentUser , isLoading } = useLogIn(user)
    
    function displayErrors()
    {
        errorMsgRef.current?.classList.remove("invisible");
        emailInputRef.current?.classList.add("invalid-input");
        passWordInputRef.current?.classList.add("invalid-input");
    }

    function hideErrors()
    {
        errorMsgRef.current?.classList.add("invisible");
        emailInputRef.current?.classList.remove("invalid-input");
        passWordInputRef.current?.classList.remove("invalid-input");
    }
    //handle log in
    useEffect(() => {
        //if the login is succeed go to the main page
        if (currentUser) {
            
            clearFields();
            hideErrors();
            setTimeout(() => {
                 navigate("/main-page");
            }, 1800);
        }
        //otherwise show log in errors
        else
        {
            if(emailInputRef.current?.value && passWordInputRef.current?.value)
            if (!currentUser) {
            displayErrors();
            setErrorMsg("Wrong login credentials");
            }
        }
        setIsLogingIn(false);
      }, [currentUser]);

 // Handle login errors
/*   useEffect(() => {
    if(emailInputRef.current?.value && passWordInputRef.current?.value)
    if (!currentUser) {
      errorMsgRef.current?.classList.remove("invisible");
      emailInputRef.current?.classList.add("invalid-input");
      passWordInputRef.current?.classList.add("invalid-input");
      setErrorMsg("Wrong login credentials");
    }
  }, [currentUser]); */

    function isValid():boolean
    {
        let isValid = true;
        if(emailInputRef.current && passWordInputRef.current)
            {
                if(!emailInputRef.current.value)
                    {
                        emailInputRef.current?.classList.add("invalid-input");
                        isValid = false;
                    }
                else
                {
                    emailInputRef.current.classList.remove("invalid-input");
                }
                if(!passWordInputRef.current.value)
                    {
                        passWordInputRef.current?.classList.add("invalid-input");
                        isValid = false;
                    }
                else
                {
                    passWordInputRef.current.classList.remove("invalid-input");
                }

            }
            return isValid;
    }

    function handleFieldsValidation()
    {
        if(!isValid())
            {
                errorMsgRef.current?.classList.remove("invisible");
            }
        else
        {
            errorMsgRef.current?.classList.add("invisible");
        }
    }

     function updateUserCredentials()
    {
        if(emailInputRef.current && passWordInputRef.current)
        setUser({
            email:emailInputRef.current?.value,
            passWord:passWordInputRef.current?.value});
            if(emailInputRef.current?.value && passWordInputRef.current?.value)
            setIsLogingIn(true);
            
        
    }

    function spinner()
    {
        return <div className="spinner"></div>
    }
    
    function clearFields()
    {
        if(emailInputRef.current && passWordInputRef.current)
            {
                emailInputRef.current.value ="";
                passWordInputRef.current.value ="";
            }
    }

    return <>
        <div className="login">
            <p className="title">Log in</p>
            <form className="login-form" onSubmit={(e)=>{
                e.preventDefault();
                handleFieldsValidation();
                updateUserCredentials();
   
            }}>


                <div className="field-ctr">

                    <label className="field-label" >e-mail</label>

                    <div className="input-ctr login-input-ctr">
                        <MdOutlineAlternateEmail size={23} color="#45556c" />
                        <input ref={emailInputRef} className="field-input" type="email" onKeyUp={()=>{
                        }} />
                    </div>

                </div>

                <div  className="field-ctr">

                <label className="field-label" >password</label>

                    <div className="input-ctr login-input-ctr" >
                        <CgPassword size={23} color="#45556c"/>
                        <input ref={passWordInputRef} className="field-input" type="password" onKeyUp={()=>{
                        }} />
                    </div>

                </div>

                <p ref={errorMsgRef} className="error-msg invisible">{errorMsg}</p>

                <button /* disabled= {isDisabled} */ className="login-btn log-in "onClick={()=>{
                    
                }}>{(isLoading && isLogingIn)? spinner():"log in"}</button>
               
            </form>

        </div>
    </>
}

export default Login;