import { BrowserRouter,Redirect,Route, RouteProps } from "react-router-dom";
import Messenging from "../Pages/Messenging";
import ResetPassword from "../Pages/ResetPassword";
import AccountVerification from "../Pages/AccountVerification";
import WelcomeOperator from "../Pages/Authentication/LoginOperator";
import LoginNewOperator from "../Pages/SignUpOperator";
import ForgotPass from "../Pages/ForgotPassword";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import SearchBar from "../Components/Search";
import ListOfInbox from "../Components/ListOfInbox/ListOfInbox";
import { SideBarContext } from "../Contexts/SideBarContext";

interface ProtectedRouteProps extends RouteProps {
    // Définition explicite de children comme React.ReactNode
    children: React.ReactNode;
}
export default function AppRoutes(){
    const {clicked}=useContext(SideBarContext)
    const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...rest }) => {
        const { currentuser } = useContext(AuthContext);
   
        if (!currentuser) {
     
          return <Redirect to="./" />;
        }
      
  
        return <Route {...rest}>{children}</Route>;
      };
    return(
        
        <BrowserRouter>
          
            <Route exact path="/">
        <WelcomeOperator/>
        </Route>
        <Route exact path="/Reset">
        <ResetPassword/>
        </Route>
        <Route exact path="/AccountVerification">
        <AccountVerification/>
        </Route>
        <ProtectedRoute>
        <Route exact path="/Messenging">
        <Messenging >
        {clicked ? <SearchBar /> : <ListOfInbox />}
            </Messenging>
        </Route>
        </ProtectedRoute>
      
        <Route exact path="/LoginNewOperator">
        <LoginNewOperator/>
        </Route>
        <Route exact path="/ForgotPassword">
        <ForgotPass/>
        </Route>
    
        </BrowserRouter>
        
    )
}