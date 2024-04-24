import React, { useContext } from 'react'
import threedots from '../../Assets/Images/threedots.png'
import { SideBarContext } from '../../Contexts/SideBarContext';
 interface NavbarProps{
  status:string;
 }
 const NavBar: React.FC<NavbarProps> = ({ status}) => {
const {sender,user}=useContext(SideBarContext)
    return(
<div className="navbar bg-white">
  {/* Avatar and user info */}
  <div className="flex items-center">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
    <div className="ml-2">
      <a className="btn btn-ghost text-xl text-black" defaultValue="UserName">{`${user?.firstName} ${user?.lastName}`}</a>
      <h3 className="text-2xl" style={{ fontFamily: 'Poppins', fontSize: '1rem', fontStyle: 'normal', fontWeight: '400', lineHeight: '20px', textTransform: 'capitalize', color: '#E73737' }}>{status}</h3>
    </div>
  </div>
  {/* Resolved button */}
  <div className="flex-none ml-auto">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-primary bg-white focus:outline-none" style={{ border: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <path d="M18.3334 9.73333V10.5C18.3323 12.297 17.7504 14.0456 16.6745 15.4849C15.5985 16.9241 14.0861 17.9771 12.3628 18.4866C10.6395 18.9961 8.79774 18.9349 7.11208 18.3122C5.42642 17.6894 3.98723 16.5384 3.00915 15.0309C2.03108 13.5234 1.56651 11.7401 1.68475 9.94693C1.80299 8.1538 2.49769 6.44694 3.66525 5.08089C4.83281 3.71485 6.41068 2.76282 8.16351 2.36679C9.91635 1.97076 11.7502 2.15195 13.3917 2.88333" stroke="#7BC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3333 3.83334L10 12.175L7.5 9.67501" stroke="#7BC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ color: '#7BC600' }}>Resolved</span>
      </div>
    </div>
  </div>
  {/* Menu button */}
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="5" r="1" />
          <circle cx="10" cy="10" r="1" />
          <circle cx="10" cy="15" r="1" />
        </svg>
      </div>
    </div>
  </div>
</div>










    
    
    

    )

    }

    export default NavBar;
    