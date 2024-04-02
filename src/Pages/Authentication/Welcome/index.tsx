import React, { ChangeEvent } from 'react';
import '../Welcome/index.css'
import {useState} from "react"
import Logo from '../../../Assets/Images/logoAvia.png'
import {Link} from 'react-router-dom'
 


        const WelcomeOperator = () => {
          const [InputValue,setInputValue]=useState({
            emailPhoneWelc:"",passwordWelc:""
          })
console.log(InputValue)
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            // Destructuring pour extraire les propriétés `name` et `value` de l'événement
            const { name, value } = event.target;
          
            // Utilisation de la fonction de mise à jour de l'état avec une fonction de rappel
            setInputValue((prevInputValue) => ({
              // Copie de toutes les valeurs précédentes de l'état
              ...prevInputValue,
              // Mise à jour de la valeur associée à la clé `name`
              [name]: value
            }));
          };
          
          const handleSubmit=(e:SubmitEvent)=>{ e.preventDefault();
          console.log(InputValue)}

            return(        <div className="LoginAdmin flex items-center justify-center p-20">
            <div className="containerWelc w-555 h-640 mx-auto">
              <img src={Logo} className="LogoWelc mx-auto" alt="Logo" />
              <form action="#" className="WelcForm">
                <h2>Welcome to Operator View</h2>
                <h3>An account is required. Please ask an existing member for an invitation or log in to continue. </h3>
                <div className="Welcgroup">
                  <label htmlFor="emailPhoneWelc">Phone number or Email</label>
                  <input type="text" id="emailPhoneWelc" name="emailPhoneWelc" onChange={handleChange} required />
                </div>
                <div className="Welcgroup">
                  <label htmlFor="passwordWelc">Password</label>
                  <input type="password" id="passwordWelc" name="passwordWelc" onChange={handleChange} required />
                </div>
                <div className="CheckboxWelc">
  <label htmlFor="rememberMeWelc" style={{marginRight: "5px"}}>Remember me</label>
  <input type="checkbox" id="rememberMeWelc" name="rememberMeWelc" />
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


