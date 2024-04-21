import React, { useContext } from 'react'
 

import NavBar from '../NavBar/NavBar' 
import Button from '../Button'
import InputContainer from '../InputContainer'
import LeftMessage from '../LeftMessage/LeftMessage';
import RightChatBubble from '../RightChatBubble/RightChatBubble';
import { MessengingContext } from '../../Contexts/MessengingContext';

 



export default function ChatRoom() {
  const {messagesent}=useContext(MessengingContext)
  return (
    <div >
      <NavBar status="Etudiant" />
      <div style={{ backgroundColor: "#F6F7FB", overflowY:"auto",height:"29rem"}}>
      <LeftMessage
                    message="Hello there!" 
                  
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <LeftMessage 
                    message="How are you?" 
                    
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                     <RightChatBubble
                    message="Hello there!" 
                  
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <LeftMessage
                    message="How are you?" 
                 
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                    <LeftMessage
                    message="How are you?" 
                   
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                     <LeftMessage 
                    message="Hello there!" 
                   
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                <LeftMessage 
                    message="How are you?" 
                   
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                   <LeftMessage
                    message="How are you?" 
                   
                    ImageUrl="https://example.com/avatar.jpg" 
                />
                   <RightChatBubble
                    message={messagesent} 
                  
                    ImageUrl="https://example.com/avatar.jpg" 
                />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: "10px",marginTop:"1rem" ,backgroundColor:"white" , width:"100%"}}>
        <Button size="small" content="Reply" bgcolor='#E73838'  colour="white" />
        <Button size="small" content="Note" bgcolor="white"  colour="black" />
        <Button size="small" content="Reminder" bgcolor="white"  colour="black" />
        <Button size="small" content="Shortcuts"   bgcolor="white"  colour="black" />
        <Button size="small" content="Helpdesk"  bgcolor="white"  colour="black" />
      </div>
      <div style={{width:"100%", backgroundColor:"white"}}>  <InputContainer /></div>
    
    </div>
  );
      }  
