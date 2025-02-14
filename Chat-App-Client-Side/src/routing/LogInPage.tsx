import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function LogInPage()
{
    return <div className="log-in-home-page">
        <NavBar/>
        <div id="main" className="outlet">
            <Outlet/>
        </div>
    </div>
}

export default LogInPage;