import React, { Children } from "react";
import logo from "./logo.svg";
import "./App.css";
import RightSideBar from "./Components/RightSideBar";
import Messenging from "./Pages/Messenging";
import WelcomeOperator from "./Pages/Authentication/LoginOperator";
import ForgotPass from "./Pages/ForgotPassword";
import LoginNewOperator from "./Pages/SignUpOperator";
import "./Pages/Authentication/LoginOperator/index.css";
import ResetPassword from "./Pages/ResetPassword";
import AccountVerification from "./Pages/AccountVerification";
import ForgotPassword from "./Pages/ForgotPassword";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  RouteProps,
} from "react-router-dom";
import AppRoutes from "./Routes";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./Contexts/AuthContext";
import {
  MessengingContext,
  MessengingProvider,
} from "./Contexts/MessengingContext";
import { SideBarContext, SideBarProvider } from "./Contexts/SideBarContext";
import { useQuery, useMutation } from "react-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  return (
    <SideBarProvider>
      <AuthProvider>
        <MessengingProvider>
          <AppRoutes></AppRoutes>
        </MessengingProvider>
      </AuthProvider>
    </SideBarProvider>
  );
}

export default App;
