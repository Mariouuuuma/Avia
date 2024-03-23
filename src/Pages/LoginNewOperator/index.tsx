import Logo from '../../Assets/Images/logoAvia.png';
import './index.css';

function LoginNewOperator() {
  return (
    <div className="LoginAdmin flex items-center justify-center p-20">
      <div className="container">
        <form action="#" className="login-form">
          <div className="flex justify-center">
            <img src={Logo} className="Logo" alt="Logo" />
          </div>
          <h2>Welcome to Operator View</h2>
          <h3>An account is required. Please ask an existing member for an invitation or log in to continue.</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form">
              <label htmlFor="rememberMe">Remember me</label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </div>
          <p><a href="#">Forgot your password?</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginNewOperator;





