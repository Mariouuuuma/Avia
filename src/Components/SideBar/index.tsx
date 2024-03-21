import React from 'react'
import logo from '../../Assets/Images/logoAvia.png'
import inbox from '../../Assets/Images//inbox.png'
import analytics from '../../Assets/Images//analytics.png'
import imagehomme from '../../Assets/Images//image homme.png'
import flag from'../../Assets/Images//flag language.png'
import search from'../../Assets/Images//search.png'
import setting from '../../Assets/Images//settings .png'
import notifications from '../../Assets/Images//notif .png'
import archived from'../../Assets/Images//archived.png'
import './index.css'

export default function Messangingsidebar(){
  return(
    <div className="SideBar">
    <div className="upperSide">
    <img src={logo}
     className="logo"></img>
    <div className="Inbox">
    <img src={inbox} className="photo"></img>
    <h6 className="title">Inbox</h6>
    </div>
  <div className="Analytics"> <img src={analytics} className="photo"></img>
    <h6 className="title">Analytics</h6></div>
   <div className="Settings">   <img src={setting} className="photo"></img>
    <h6 className="title">Settings</h6></div>
 <div className="Notifs">  <img src={notifications} className="photo"></img>
  <h6 className="title">Notifications</h6></div>
<div className="Archived"> <img src={archived} className="photo"></img>



<div className="lowerside">
<img src={imagehomme}className="photoMan"></img>
    <img src={flag} className="photo"></img>
    <img src={search} className="photo"></img>
</div>


</div>
</div>
</div>
)
  
};
    
