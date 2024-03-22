import Logo from '../../Assets/Images/logoAvia.png'
import '../LoginNewOperator/index.css'
export default function LoginNewOperator(){
    return(
<div className="container">
    <form action="#" className="login-form">
    <img src={Logo} className="Logo"></img>
      <h2>Welcome to Operator View</h2>
      <h3>An account is required. Please ask an existing member for an invitation or log in to continue.</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" required></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form">
           <label htmlFor="rememberMe">Remember me</label>
          <input type="checkbox" id="rememberMe" name="rememberMe"></input>
         
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
    )
}

