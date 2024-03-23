import Logo from '../../Assets/Images/logoAvia.png'
import '../AccountVerification/index.css'

function AccountVerification(){
    return(
        <div className="container">
             <div className="col d-flex justify-content-center"> {/* Utilisation de d-flex et justify-content-center pour centrer horizontalement */}
                        <img src={Logo} className="Logo mx-auto" alt="Logo" />
                    </div>
        <form action="#" className="verification-form">
          <h2>Account Verification</h2>
          <h3>Please enter the 4-digit  code that you received on your email address.</h3>
          <div className="form-group">
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
          </div>
          <div className="form-row">
            <div className="form-group">
              <button type="submit">Verify</button>
            </div>
          </div>
        </form>
      </div>
    )
}
export default AccountVerification