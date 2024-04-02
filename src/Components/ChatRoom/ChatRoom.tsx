import React from 'react'
 

import NavBar from '../NavBar/NavBar'
import ChatBubble from '../LeftChatBubble/LeftChatBubble'
import Button from '../Button'
import InputContainer from '../InputContainer'
import RightChatBubble from '../RightChatBubble/RightChatBubble'

export default function ChatRoom() {
  return (
    <div >
      <NavBar status="Etudiant" />
      <div style={{ backgroundColor: "#F6F7FB", overflowY:"auto",maxHeight:"30rem",height:"100%"}}>
      <RightChatBubble 
                    content="Hello there!" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <RightChatBubble 
                    content="How are you?" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                     <RightChatBubble 
                    content="Hello there!" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <RightChatBubble 
                    content="How are you?" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                    <RightChatBubble 
                    content="How are you?" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                     <RightChatBubble 
                    content="Hello there!" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <RightChatBubble 
                    content="How are you?" 
                    DateSent={new Date()} 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: "10px",marginTop:"1rem" }}>
        <Button size="small" content="Reply" bgcolor='#E73838'  colour="white" />
        <Button size="small" content="Note" bgcolor="white"  colour="black" />
        <Button size="small" content="Reminder" bgcolor="white"  colour="black" />
        <Button size="small" content="Shortcuts"   bgcolor="white"  colour="black" />
        <Button size="small" content="Helpdesk"  bgcolor="white"  colour="black" />
      </div>
      <InputContainer />
    </div>
  );
      }  