import React from 'react';
import Logo from '../../Assets/Images/logoAvia.png';
import './index.css'

function ResetPassword() {
    return (
        <div className="containerReset">
            <form action="#" className="login-form">
                <img src={Logo} style={{ maxWidth: '4rem', maxHeight: '4rem' }} className="Logo mx-auto" alt="Logo" /> {/* Ajout d'un attribut alt pour l'accessibilité */}
                <h2>Reset Password</h2>
                <h3>Set the new password for your account so you can login and access all features.</h3>
                <div className="form-group">
                    <label htmlFor="NewPassword">New Password</label>
                    <input type="password" id="NewPassword" name="NewPassword" required />
                </div>
                <div className="form-group">
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="password" id="ConfirmPassword" name="ConfirmPassword" required />
                </div>
                <div className="ResetPass"
                > <div className="form-group">
                    <button type="submit">Reset Password</button>
                </div></div>
               
            </form>
        </div>
    );
}

export default ResetPassword;
