import Logo from '../../Assets/Images/logoAvia.png';
 
import './index.css';
import {Link} from 'react-router-dom'

function LoginNewOperator() {


  return (
    <div className="flex items-center justify-center p-20">
      <div className="containerNewOp">
        <form action="#" className="login-form">
          <div className="flex justify-center">
            <img src={Logo} className="Logo" alt="Logo" />
          </div>
          <h2>Welcome to Operator View</h2>
          <h3>An account is required. Please ask an existing member for an invitation or log in to continue.</h3>
          <div className="formRow">
            <div className="formNewOp-group">
              <label htmlFor="firstNameNewOp">First Name</label>
              <input type="text" id="firstNameNewOp" className='n1' name="firstName" required />
            </div>
            <div className="formNewOp-group">
              <label htmlFor="lastNameNewOp">Last Name</label>
              <input type="text" id="lastNameNewOp" name="lastName" required />
            </div>
          </div>
          <div className="formRow">
            <div className="formNewOp-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="formNewOp-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required />
            </div>
          </div>
          <div className="formRow">
            <div className="formNewOp-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="formNewOp-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
          </div>
          <div className="formRow">
            <div className="form">
              <label htmlFor="rememberMe">Remember me</label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
            </div>
          </div>
          <div className="ButtonDisp">
            <div>
              <button className="SignUp" type="submit">Sign Up</button>
            </div>
          </div>
          <p><Link to="/ForgotPassword">Forgot your password?</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginNewOperator;





