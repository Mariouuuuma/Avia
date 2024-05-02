import { BrowserRouter, Redirect, Route, RouteProps } from "react-router-dom";
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
import supabase from "../Utils/api";
import { AuthError, Session } from "@supabase/supabase-js";
import Logout from "../Components/Logout";
import MessengingClient from "../Pages/Partieclient/Pages/Messenging";
import Reservation from "../Pages/Partieclient/Pages/passenger/Passenger";
import Passenger from "../Pages/Partieclient/Pages/passenger/Passenger";

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode;
}
export default function AppRoutes() {
  const { clicked, sender } = useContext(SideBarContext);

  const { currentuser, loggedOut } = useContext(AuthContext);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    ...rest
  }) => {
    const storedToken = localStorage.getItem("supabase_access_token");

    if (!currentuser && !storedToken) {
      return <Redirect to="./" />;
    }
    if (storedToken) {
      const verifyToken = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          return <Redirect to="./login" />;
        }
      };
      verifyToken();
    }

    return <Route {...rest}>{children}</Route>;
  };
  return (
    <BrowserRouter>
      <Route exact path="/">
        <WelcomeOperator />
      </Route>
      <Route exact path="/Reset">
        <ResetPassword />
      </Route>
      <Route exact path="/AccountVerification">
        <AccountVerification />
      </Route>
      <ProtectedRoute>
        <Route exact path="/Messenging">
          <Messenging>{clicked ? <SearchBar /> : <ListOfInbox />}</Messenging>
        </Route>
      </ProtectedRoute>

      <Route exact path="/LoginNewOperator">
        <LoginNewOperator />
      </Route>
      <Route exact path="/MessengingClient">
        <MessengingClient />
      </Route>
      <Route exact path="/ForgotPassword">
        <ForgotPass />
      </Route>
      <Route exact path="/Reservation">
        <Reservation />
      </Route>
      <Route exact path="/Passenger">
        <Passenger />
      </Route>
    </BrowserRouter>
  );
}
