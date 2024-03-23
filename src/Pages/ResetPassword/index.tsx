import React from 'react';
import Logo from '../../Assets/Images/logoAvia.png';

function ResetPassword() {
    return (
        <div className="container">
            <form action="#" className="login-form">
                <img src={Logo} style={{ width: '60.5px', height: '60.5px' }} className="Logo mx-auto" alt="Logo" /> {/* Ajout d'un attribut alt pour l'accessibilité */}
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
                <div className="form-group">
                    <button type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;
