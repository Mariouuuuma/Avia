import Logo from '../../Assets/Images/logoAvia.png'
import './index.css'
function test(){
    return(
            <div className="container">
               <img src={Logo}></img>
              <h2>Welcome to Operator View</h2>
              <h3>An account is required. Please ask an existing member for an invitation or log in to continue.</h3>
            <form action="#" className="formulaire">
           
              <div className="">
                <div className="">
                  <label htmlFor="">First Name</label>
                  <input type="text" className="input" id="firstName" name="firstName" required></input>
                </div>
                <div className="">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required></input>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required></input>
                </div>
                <div className="">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" required></input>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required></input>
                </div>
                <div className="">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required></input>
                </div>
              </div>
              <div className="">
                <div className="">
                   <label htmlFor="rememberMe">Remember me</label>
                  <input type="checkbox" id="rememberMe" name="rememberMe"></input>
                 
                </div>
              </div>
              <div className="">
                <div className="">
                  <button type="submit">Login</button>
                </div>
              </div>
              <p><a href="#">Forgot your password?</a></p>
            </form>
          </div>
      
          )
      }
    
      export default test