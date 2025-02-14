import { useRef, useState } from "react";
import { CgPassword } from "react-icons/cg";
import useUserLogInInfos from "../stores/useUserLogInInfos";
import useChangePassWord from "../hooks/useChangePassWord";
import { useLogIn } from "../hooks/useLogIn";

function ChangePassword()
{
    const {user}=useUserLogInInfos();
    const {data:currentUser} = useLogIn(user);
    const changePassWord = useChangePassWord();
    const [errorMsg ,setErrorMsg] = useState("all fields are required");

    const newPassWordInputRef = useRef<HTMLInputElement>(null);
    const currentPassWordInputRef = useRef<HTMLInputElement>(null);
    const confirmPassWordInputRef = useRef<HTMLInputElement>(null);
    const errorMsgRef = useRef<HTMLParagraphElement>(null);

    function isValid()
    {
        let isValid = true;
        if(currentPassWordInputRef.current && newPassWordInputRef.current && confirmPassWordInputRef.current)
        {
            //if one of the fields is empty
            if(!currentPassWordInputRef.current.value || !newPassWordInputRef.current.value || !confirmPassWordInputRef.current.value)
            {
                if(!currentPassWordInputRef.current.value)
                    {
                        currentPassWordInputRef.current.classList.add("invalid-input");
                        setErrorMsg("all fields are required");
                        isValid = false;
                    }
                    else
                    {
                        currentPassWordInputRef.current.classList.remove("invalid-input");
                    }
                    if(!newPassWordInputRef.current.value)
                        {
                            newPassWordInputRef.current.classList.add("invalid-input");
                            setErrorMsg("all fields are required");
                            isValid = false;
                        }
                        else
                        {
                            newPassWordInputRef.current.classList.remove("invalid-input");
                        }
                        if(!confirmPassWordInputRef.current.value)
                            {
                                confirmPassWordInputRef.current.classList.add("invalid-input");
                                setErrorMsg("all fields are required");
                                isValid = false;
                            }
                            else
                            {
                                confirmPassWordInputRef.current.classList.remove("invalid-input");
                            }
            }
            else
            {
                if(currentPassWordInputRef.current.value !== user?.passWord)
                    {
                        currentPassWordInputRef.current.classList.add("invalid-input");
                        setErrorMsg("the password you enter does not match your current password");
                        isValid = false;
                    }
                    else
                    {
                        currentPassWordInputRef.current.classList.remove("invalid-input");
                    }
                    if(newPassWordInputRef.current.value !== confirmPassWordInputRef.current.value)
                    {
                        confirmPassWordInputRef.current.classList.add("invalid-input");
                        setErrorMsg("wrong comfirmed password");
                        isValid = false;
                    }
                    else
                    {
                        confirmPassWordInputRef.current.classList.remove("invalid-input");
                    }
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

    function clearFields()
    {
        if(currentPassWordInputRef.current && newPassWordInputRef.current && confirmPassWordInputRef.current)
        {
            currentPassWordInputRef.current.value ="";
            newPassWordInputRef.current.value ="";
            confirmPassWordInputRef.current.value ="";
        }
    }

    function handlePassWordChange()
    {
        changePassWord
        .mutate({userId:Number(currentUser?.userId ), newPassWord : newPassWordInputRef.current?.value.trim()});
        clearFields();
    }

    function spinner()
    {
        return <div className="spinner"></div>
    }
   
    return <div className="create-account ">
    <p className="title">change password</p>
    <form className="login-form create-account-form change-password-form" onSubmit={(e)=>{
        e.preventDefault();
        handleFieldsValidation();
        handlePassWordChange();
    }}>
    
    <div  className="field-ctr">

         <label className="field-label" >current password</label>

        <div className="input-ctr" >
            <CgPassword size={23} color="#45556c"/>
            <input ref={currentPassWordInputRef} className="field-input" type="password" />
        </div>

    </div>

    <div  className="field-ctr">

    <label className="field-label" >new password</label>

    <div className="input-ctr" >
    <CgPassword size={23} color="#45556c"/>
    <input ref={newPassWordInputRef} className="field-input" type="password" />
    </div>

    </div>

    <div  className="field-ctr">

    <label className="field-label" >comfirm password</label>

    <div className="input-ctr" >
    <CgPassword size={23} color="#45556c"/>
    <input ref={confirmPassWordInputRef} className="field-input" type="password" />
    </div>

    </div>
        <p ref={errorMsgRef} className="error-msg invisible">{errorMsg}</p>

        <button className="login-btn change-password-btn">
            {changePassWord.isLoading? spinner():"apply changes"}
        </button>

    </form>
</div>
}

export default ChangePassword;