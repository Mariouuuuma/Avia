import { BrowserRouter,Route } from "react-router-dom";
import Messenging from "../Pages/Messenging";
import ResetPassword from "../Pages/ResetPassword";
import AccountVerification from "../Pages/AccountVerification";
import WelcomeOperator from "../Pages/Authentication/Welcome";
import LoginNewOperator from "../Pages/LoginNewOperator";
import ForgotPass from "../Pages/ForgotPassword";


export default function AppRoutes(){
    return(
        
        <BrowserRouter>
          
            <Route exact path="/Messenging">
        <Messenging/>
        </Route>
        <Route exact path="/Reset">
        <ResetPassword/>
        </Route>
        <Route exact path="/AccountVerification">
        <AccountVerification/>
        </Route>
        <Route exact path="/WelcomeOperator">
        <WelcomeOperator/>
        </Route>
        <Route exact path="/LoginNewOperator">
        <LoginNewOperator/>
        </Route>
        <Route exact path="/ForgotPassword">
        <ForgotPass/>
        </Route>
    
        </BrowserRouter>
        
    )
}