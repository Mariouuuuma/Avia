import React from 'react';
import imghomme from '../../Assets/Images/image homme.png';

interface LeftChatBubbleProps {
  content: string;
  DateSent: Date;
  ImageUrl: string;
}

const LeftChatBubble: React.FC<LeftChatBubbleProps> = ({ content, DateSent, ImageUrl }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Avatar" src={ImageUrl} />
        </div>
      </div>
      <div className="chat-header">
        Anakin
        <time className="text-xs opacity-50">{DateSent.toLocaleString()}</time>
      </div>
      <div className="chat-bubble">{content}</div>
      <div className="chat-footer opacity-50">Seen at {DateSent.toLocaleTimeString()}</div>
    </div>
  );
};

export default LeftChatBubble;