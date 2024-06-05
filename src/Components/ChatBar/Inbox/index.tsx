import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import supabase from "../../../Utils/api";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { MessengingContext } from "../../../Contexts/MessengingContext";
import { RedboxContext } from "../../../Contexts/RedboxContext";

type Color = string | "#ED3863" | "white" | "#7BC600";
type ClickHandler = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

interface ConvData {
  ConversationName: string;
  body: string;
  created_at: string;
  id: number;
}

interface InboxProps {
  username: string;
  avatarUrl: string;
  MessageState: string;
  nowText: string;
  Message: string;
  bagcolor?: string;
  ButtonColor: Color;
  onClick?: () => void;
}

const Inbox: React.FC<InboxProps> = ({
  username,
  avatarUrl,
  MessageState,
  nowText,
  Message,
  bagcolor,
  ButtonColor,
  onClick,
}) => {
  const [bgcolor, setBgColor] = useState<string>("");
  const { currentuser } = useContext(AuthContext);
  const { inboxClicked, setInboxClicked } = useContext(SideBarContext);
  const { receiver, setReceiver, setSender } = useContext(SideBarContext);
  const [err, setErr] = useState<boolean>(false);
  const { setConvName, convName, setguestId } = useContext(MessengingContext);
  const storedConversationId = localStorage.getItem("conversationId");
  const { redbox, setRedbox } = useContext(RedboxContext);

  const [conv, setConv] = useState<ConvData | null>(null);

  const HandleInboxClick = async () => {
    setConvName(username);
    setguestId(idNumber);
    setInboxClicked(!inboxClicked);
  };
  const [Conversation, Id] = username ? username.split(" ") : ["", ""];

  const idNumber = parseInt(Id, 10);

  return (
    <div
      className="navbar bg-base-100 border border-gray-300 flex justify-between items-center w-73 rounded-lg px-15 py-14 gap-16"
      style={{
        backgroundColor: bagcolor ? bagcolor : bgcolor,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setBgColor("#F0F1F3")}
      onMouseLeave={() => setBgColor("")}
      onClick={HandleInboxClick}
    >
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <img alt="Avatar" src={avatarUrl} className="w-10 rounded-full" />
        </a>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="text-xs text-gray-700">{username}</span>
          <span className="text-xs text-gray-500">{Message}</span>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm text-gray-700">{nowText}</span>
        <div className="mt-2">
          <div className="relative">
            <span className="absolute top-0 right-0 -mt-2 -mr-1 inline-flex items-center bg-green-500 justify-center h-4 w-4 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
