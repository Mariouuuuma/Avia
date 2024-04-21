import React from 'react';

interface LeftChatBubbleProps {
    message: string;
  
    ImageUrl: string;
}

const LeftMessage: React.FC<LeftChatBubbleProps> = ({ message , ImageUrl }) => {
    return (
        <div className="chat chat-start" style={{marginTop:"1rem"}}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={ImageUrl} />
                </div>
            </div>
          
          
            <div className="chat-bubble">{message}</div>
          
        </div>
    );
}

export default LeftMessage;