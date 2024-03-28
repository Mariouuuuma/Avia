import React from 'react'
 

import NavBar from '../NavBar/NavBar'
import ChatBubble from '../LeftChatBubble/LeftChatBubble'
import Button from '../Button'
import InputContainer from '../InputContainer'

export default function ChatRoom() {
  return (
    <div style={{ width: "1068px", height: "600px" }}>
      <NavBar />
      <div style={{ backgroundColor: "#F6F7FB" }}>
        {/* 
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
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