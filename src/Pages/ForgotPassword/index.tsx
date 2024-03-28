import LogoImage from '../../Assets/Images/logoAvia.png'
import '../ForgotPassword/index.css'
import {Link} from 'react-router-dom'

function ForgotPass(){
    return(
        <div className="flex items-center justify-center p-5">
            <div className="container w-555 h-600 mx-auto">
              <img src={LogoImage} className="Logo mx-auto" alt="Logo" />
              <form action="#" className="login-form">
                <h2>Forgot Password</h2>
                <h3>Enter your email for the verification process, we will send 4 digits code to your email. </h3>
                <div className="form-group">
                  <label htmlFor="emailPhone">E-mail*</label>
                  <input type="text" id="emailPhone" name="emailPhone" required />
                </div>
                <div className="form-group">
                  <button type="submit"><Link to="/AccountVerification">Send</Link></button>
                </div>
                <p>Have already an account?</p>
                <p style={{marginBottom: '5px'}}><Link to="/WelcomeOperator">Login</Link></p>
              </form>
            </div>
          </div>
    )
}
export default ForgotPass
