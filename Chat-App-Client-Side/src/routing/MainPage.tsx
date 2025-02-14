import { Outlet } from "react-router-dom";
import MainPageNavBar from "../components/MainPageNavBar";

function MainPage()
{
    return<div className="main-page">
    <MainPageNavBar/>
    <div id="main-home-page" className="outlet">
        <Outlet/>
        
    </div>
    </div>
}

export default MainPage;