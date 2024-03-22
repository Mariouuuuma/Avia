import React from 'react'
import SideBar from '../../Components/SideBar'
import Button from '../../Components/Button'
import YellowBand from '../../Components/YellowBand';
import Inbox from '../../Components/ChatBar/Inbox';
import threedots from '../../Assets/Images/threedots.png'
import ChatRoom from '../../Components/ChatRoom/ChatRoom';
import RightSideBar from '../../Components/RightSideBar';
export default function Messenging(){
    return(
        <div  className="flex items-center min-h-screen space-container w-screen mx-h-640 mx-autox-4"  style={{zoom:'0.8'}} >
           <div  style={{ width: '98px', height: '1080px' }} >
        <SideBar />
        </div>
        <div style={{
            maxWidth:'368px',
    height:'1080px',
    display: 'flex',
    padding: '10px 15px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
}}>
    <div style={{ width: '368px', height: '32px' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', justifyContent: 'space-between' }}>
                <Button size="small" content="All" bgcolor="Red" colour="white" />
                <Button size="small" content="Unread" bgcolor="white" colour="black" />
                <Button size="small" content="Unresolved" bgcolor="white" colour="black" />
                <Button size="small" content="Resolved" bgcolor="white" colour="black" />
                <img src={threedots} style={{
                    display: 'flex',
                    width: '32px',
                    height: '32px',
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }} />
            </div>
        </div>
        
    </div>
 <span><YellowBand></YellowBand></span>
    <span style={{ width: '368px', height: '1004px'}}>
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
<div className="ChatBar">
    
</div>
<div
style={{maxWidth:"1920px",
height:"1080px"}} ><ChatRoom ></ChatRoom></div>
<div
style={{maxWidth:"386px",
height:"1080px"}}><RightSideBar></RightSideBar></div>

</div>
      
    );
}