import React, { useContext } from 'react';
 
import { MessengingContext } from '../../Contexts/MessengingContext';
 

interface RightChatBubbleProps {
  message: string;
 
  ImageUrl: string;
}

const RightChatBubble: React.FC<RightChatBubbleProps> = ({ message, ImageUrl }) => {
 
 
  return (
    <div className="chat chat-end" style={{marginTop:"1rem",}}>
        <div className="chat-image avatar" >
            <div className="w-10 rounded-full" >
                <img alt="Tailwind CSS chat bubble component" src={ImageUrl} />
            </div>
        </div>
      
      
        <div className="chat-bubble" style={{backgroundColor:"#E73737",color:"white"}}>{message}</div>
      
    </div>
);

};

export default RightChatBubble;