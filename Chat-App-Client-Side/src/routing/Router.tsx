import { createBrowserRouter } from "react-router-dom";
import LogInPage from "./LogInPage";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
import MainPage from "./MainPage";
import ConversationsPage from "../components/ConversationsPage";
import UpdateUserInfos from "../components/UpdateUserInfos";
import ChangePassword from "../components/ChangePassword";
import CloseAccount from "../components/CloseAccount";

const router =  createBrowserRouter([
  {path:"/",
    element : <LogInPage/>,
    children:[
        {path:"" , element:<Login/>},
        {path:"openAccount" , element:<CreateAccount/>},
    ] 

  },
  {
    path:"/main-page",
    element:<MainPage/>,
    children:[
      {path:"",element:<ConversationsPage/>},
      {path:"update",element:<UpdateUserInfos/>},
      {path:"changepassword" , element:<ChangePassword/>},
      {path:"closeaccount",element:<CloseAccount/>}
    ]
  }

]);

export default router;