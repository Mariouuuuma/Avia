import React from 'react';
import logo from './logo.svg';
import './App.css';
import RightSideBar from './Components/RightSideBar';
import Messenging from './Pages/Messenging';
import WelcomeOperator from './Pages/Authentication/Welcome';
import ForgotPass from './Pages/ForgotPassword';
import LoginNewOperator from './Pages/LoginNewOperator'
import '../src/Pages/Authentication/Welcome/index.css'
import ResetPassword from './Pages/ResetPassword';
import AccountVerification from './Pages/AccountVerification';
import ForgotPassword from './Pages/ForgotPassword';
import ChatBubble from './Components/LeftChatBubble/LeftChatBubble';
import RightChatBubble from './Components/RightChatBubble/RightChatBubble';
import LeftChatBubble from './Components/LeftChatBubble/LeftChatBubble';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';




 
function App() {
  return (
    
  
  <Router>
    <Switch>
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
    </Switch>
   
  </Router>



    
  );
}

export default App;
