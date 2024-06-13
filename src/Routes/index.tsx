import { BrowserRouter, Redirect, Route, RouteProps } from "react-router-dom";
import Messenging from "../Pages/Messenging";
import ResetPassword from "../Pages/ResetPassword";
import AccountVerification from "../Pages/AccountVerification";
import WelcomeOperator from "../Pages/Authentication/LoginOperator";
import LoginNewOperator from "../Pages/SignUpOperator";
import ForgotPass from "../Pages/ForgotPassword";
import { useContext, useState } from "react";
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
import Settings from "../Components/Settings/Settings";
import { Form } from "formik";
import Formulaire from "../Components/Settings/Formulaire/EditInfo";
import EditInfo from "../Components/Settings/Formulaire/EditInfo";
import InfoVol from "../Components/InformationVol/InfoVol";
import Flightbooking from "../Pages/Partieclient/Pages/abc/FlightBooking";
import Flightbooking2 from "../Pages/Partieclient/Pages/cde/Flightbooking2";
import Flightbooking3 from "../Pages/Partieclient/Pages/efg/Flightbooking3";
import Payment from "../Pages/Partieclient/Pages/Payment/Payment";
import ServiceLounge from "../Pages/Partieclient/Pages/efg/ServiceLounge/ServiceLounge";
import TeamManage from "../Pages/Partieclient/TeamManage/TeamManage";
import test from "../Components/test";
import ContactUs from "../Components/test";
import Seat from "../Components/SS/Seat";

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode;
}
export default function AppRoutes() {
  const { clicked, sender } = useContext(SideBarContext);

  const { currentuser, loggedOut } = useContext(AuthContext);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  interface Seat {
    id: number;
    number: string;
    isReserved?: boolean;
  }
  const handleSeatSelected = (seat: Seat) => {
    setSelectedSeats([...selectedSeats, seat]);
  };

  const handleSeatDeselected = (seat: Seat) => {
    setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
  };

  const handleReservation = async () => {
    try {
      // Logique de réservation des sièges
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    ...rest
  }) => {
    const storedToken = localStorage.getItem("supabase_access_token");

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
      <Route exact path="/Settings">
        <Settings />
      </Route>
      <Route exact path="/F">
        <Form />
      </Route>
      <Route exact path="/EditInfo">
        <EditInfo />
      </Route>
      <Route exact path="/InfoVol">
        <InfoVol />
      </Route>
      <Route exact path="/Flightbooking">
        <Flightbooking />
      </Route>
      <Route exact path="/Flightbooking2">
        <Flightbooking2 />
      </Route>
      <Route exact path="/Flightbooking3">
        <Flightbooking3 />
      </Route>
      <Route exact path="/Payment">
        <Payment />
      </Route>
      <Route exact path="/ServiceLounge">
        <ServiceLounge />
      </Route>
      <Route exact path="/TeamManage">
        <TeamManage />
      </Route>
      <Route exact path="/test">
        <ContactUs />
      </Route>
    </BrowserRouter>
  );
}
