import LogoImage from '../../Assets/Images/logoAvia.png'
import '../ForgotPassword/index.css'
import {Link} from 'react-router-dom'

function ForgotPass(){
    return(
        <div className="flex items-center justify-center p-5">
            <div className="containerForgotPass w-555 h-600 mx-auto">
              <img src={LogoImage} className="Logo mx-auto" alt="Logo" />
              <form action="#" className="ForgotpassForm">
                <h1>Forgot Password</h1>
                <h3>Enter your email for the verification process, we will send 4 digits code to your email. </h3>
                <div className="Forgotpassgroup">
                  <label htmlFor="emailForg">E-mail*</label>
                  <input type="text" id="emailForg" name="emailForg" required />
                </div>
                <div className="Forgotpassgroup">
                  <button type="submit"><Link to="/AccountVerification">Send</Link></button>
                </div>
                <div className="LastElems">
                <p>Have already an account?</p>
                <p style={{marginBottom: '5px'}}><Link to="/WelcomeOperator">Login</Link></p>
                </div>
            
              </form>
            </div>
          </div>
    )
}
export default ForgotPass
