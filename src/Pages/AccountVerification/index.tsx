import Logo from '../../Assets/Images/logoAvia.png'
import '../AccountVerification/index.css'

function AccountVerification(){
    return(
        <div className="containerVerf">
             <div className="col d-flex justify-content-center"> {/* Utilisation de d-flex et justify-content-center pour centrer horizontalement */}
                        <img src={Logo} className="Logo mx-auto" alt="Logo" />
                    </div>
        <form action="#" className="verification-form">
          <h2>Account Verification</h2>
          <h3>Please enter the 4-digit  code that you received on your email address.</h3>
          <div className="formVerf-group">
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
            <input type="text" maxLength={1} required></input>
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <div className="formVerf-group">
              <button type="submit">Verify</button>
            </div>
          </div>
<div style={{flex: "1 0 0"}}>
  <span className="first">If you didn't receive a code!</span>
  &thinsp;
  <span className="second">Resend</span>
</div>

        </form>
      </div>
    )
}
export default AccountVerification