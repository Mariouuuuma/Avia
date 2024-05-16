import React from "react";

interface LeftChatBubbleProps {
  message: string;
  onShow?: () => void;
  ImageUrl: string;
}

const LeftMessage: React.FC<LeftChatBubbleProps> = ({
  message,
  ImageUrl,
  onShow,
}) => {
  // Définir une variable locale pour stocker le résultat de l'appel à onShow
  const onShowResult = onShow && typeof onShow === "function" ? onShow() : null;

  return (
    <div className="chat chat-start" style={{ marginTop: "1rem" }}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={ImageUrl} />
        </div>
      </div>
      <div className="chat-bubble">{message}</div>
      {/* Remplacer void par null pour être compatible avec ReactNode */}
      {onShowResult !== undefined ? onShowResult : null}
    </div>
  );
};

export default LeftMessage;
