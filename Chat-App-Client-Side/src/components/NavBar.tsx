import { NavLink } from "react-router-dom";
import logo from "../images/chat-app.png" ;
function NavBar()
{
    return (
        <nav className="nav-bar ">
            <img className="logo" src={logo}/>
            <div className="links-div">

                <NavLink className={({isActive})=>isActive?"nav-link text-shadow-lg selected":"nav-link text-shadow-lg"} to="/">sign in</NavLink>
                <NavLink className={({isActive})=>isActive?"nav-link text-shadow-lg selected":"nav-link text-shadow-lg"} to="/openAccount">sign up</NavLink>

            </div>
        </nav>
    
    )
    
}

export default NavBar;