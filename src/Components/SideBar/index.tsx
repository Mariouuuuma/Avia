import React, { useContext, useState } from 'react'
import logo from '../../Assets/Images/logoAvia.png'
import inbox from '../../Assets/Images/inbox.png'
import analytics from '../../Assets/Images/analytics.png'
import flag from'../../Assets/Images/flag language.png'
import search from'../../Assets/Images/search.png'
import setting from '../../Assets/Images/settings .png'
import notifications from '../../Assets/Images//notif .png'
import archived from'../../Assets/Images/archived.png'
import './index.css'
import { SideBarContext } from '../../Contexts/SideBarContext'
export default function Messangingsidebar(){
  const { clicked, setClicked } = useContext(SideBarContext);
  const [myBooleanVariable, setMyBooleanVariable] = useState(false);

  const handleClick = () => {
    const newClickedValue = !myBooleanVariable;
    setMyBooleanVariable(newClickedValue);
    setClicked(newClickedValue); 
   console.log(clicked)
   
  };
  
  return(
    <div className="SideBar">
    <div className="upperSide">
    <img src={logo}
     className="logo"></img>
    <div className="Inbox">
    <button><img src={inbox} className="photo"></img></button>
    <h6 className="title">Inbox</h6>
    </div>
  <div className="Analytics"> <button><img src={analytics} className="photo  "></img></button>
    <h6 className="title">Analytics</h6></div>
   <div className="Settings">  <button> <img src={setting} className="photo  "></img></button> 
    <h6 className="title">Settings</h6></div>
 <div className="Notifs">  <button> <img src={notifications} className="photo  "></img></button>
  <h6 className="title">Notifications</h6></div>
<div className="Archived"><button> <img src={archived} className="photo  "></img></button>
<h6 className="title">Archived</h6>
</div>





</div>
<div className="lowerside">
  <button><img className="photo 
   " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA9hKFHkeThXlgaoAjby9HKLjWxQMeQOgWIhZmlPodA&s"></img></button>
<button>  <img src={flag} className="photo 
 "></img></button>
  <button onClick={handleClick}><img src={search} className="photo" ></img></button>
 
</div>
</div>
 
)
  
};
    
