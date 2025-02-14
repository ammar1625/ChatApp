import { FaUser } from "react-icons/fa";

import { CgPassword } from "react-icons/cg";
function CloseAccount()
{
    return <div className="login">
    <p className="title">close account</p>
    <form className="login-form">


        <div className="field-ctr">

            <label className="field-label" >user name</label>

            <div className="input-ctr login-input-ctr">
                <FaUser size={23} color="#45556c" />
                <input className="field-input " type="text" />
            </div>

        </div>

        <div  className="field-ctr">

        <label className="field-label" >password</label>

            <div className="input-ctr login-input-ctr" >
                <CgPassword size={23} color="#45556c"/>
                <input className="field-input" type="password" />
            </div>

        </div>

        <p className="error-msg">something went wrong</p>

        <button className="login-btn">close</button>
       
    </form>

</div>
}

export default CloseAccount;