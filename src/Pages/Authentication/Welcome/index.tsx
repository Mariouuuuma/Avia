import React from 'react';
import '../Welcome/index.css'

import Logo from '../../../Assets/Images/logoAvia.png'
import {Link} from 'react-router-dom'


        const WelcomeOperator = () => {
            return(        <div className="LoginAdmin flex items-center justify-center p-20">
            <div className="container w-555 h-640 mx-auto">
              <img src={Logo} className="Logo mx-auto" alt="Logo" />
              <form action="#" className="login-form">
                <h2>Welcome to Operator View</h2>
                <h3>An account is required. Please ask an existing member for an invitation or log in to continue. </h3>
                <div className="form-group">
                  <label htmlFor="emailPhone">Phone number or Email</label>
                  <input type="text" id="emailPhone" name="emailPhone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="form-group">
                  <button type="submit">Login</button>
                </div>
                <p><Link to="/ForgotPassword" >Forgot your password?</Link></p>
              </form>
            </div>
          </div>
          
            )
        }

        export default WelcomeOperator


