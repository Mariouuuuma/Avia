import React from 'react';

interface RightChatBubbleProps {
    content: string;
    DateSent: Date;
    ImageUrl: string;
}

const RightChatBubble: React.FC<RightChatBubbleProps> = ({ content, DateSent, ImageUrl }) => {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={ImageUrl} />
                </div>
            </div>
            <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">{DateSent.toLocaleString()}</time>
            </div>
            <div className="chat-bubble">{content}</div>
            <div className="chat-footer opacity-50">
                Delivered
            </div>
        </div>
    );
}

export default RightChatBubble;
