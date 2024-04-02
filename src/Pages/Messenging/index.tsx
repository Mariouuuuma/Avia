import React from 'react'
import SideBar from '../../Components/SideBar'
import Button from '../../Components/Button'
import YellowBand from '../../Components/YellowBand';
import Inbox from '../../Components/ChatBar/Inbox';
import threedots from '../../Assets/Images/threedots.png'
import ChatRoom from '../../Components/ChatRoom/ChatRoom';
import RightSideBar from '../../Components/RightSideBar';
import './index.css'
export default function Messenging(){
    return(
        <div  className="MessengingContainer"   
         >
           <div  style={{width:"4%"   }} >
        <SideBar />
        </div>
        <div style={{
        width:"21%",
    maxHeight:'100%',
    display: 'flex',
    padding: '10px 15px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
}}>
    <div style={{ width: "100%" }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'space-between' }}>
                <Button size="small" content="All" bgcolor="#E73838" colour="white" />
                <Button size="small" content="Unread" bgcolor="white" colour="black" />
                <Button size="small" content="Unresolved" bgcolor="white" colour="black" />
                <Button size="small" content="Resolved" bgcolor="white" colour="black" />
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
        </div>
        
    </div>
  <YellowBand></YellowBand>
  <span style={{ width: '100%', maxHeight: '35rem', overflowY: 'auto',height:"100%",marginBottom:"1rem" }}>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    }}>
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />
            <Inbox username="Mariem" avatarUrl="C:\Users\user\OneDrive\Desktop\tt\appli\src\Assets\Images\image homme.png" MessageState="4" nowText="Active" Message="Hello" bgcolor="white" ButtonColor="#7BC600" />

        </div>
    </span>
</div>
<div
style={{ 
height:"100%" ,width:"52%"}} ><ChatRoom ></ChatRoom></div>
<div className="RightSideBar" style={{maxHeight:"100%",width:"24%",overflowY:"scroll"}}>
<RightSideBar></RightSideBar></div>

</div>
      
    );
}