import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { MessengingContext } from "../../../Contexts/MessengingContext";

type Color = string | "#ED3863" | "white" | "#7BC600";
interface InboxProps {
  username: string;
  avatarUrl: string;
  MessageState: string;
  nowText: string;
  Message: string;
  bagcolor?: string;
  ButtonColor: Color;
  onClick?: () => void;
  type?: string;
  type2?: string;
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
  type,
  type2,
}) => {
  const [bgcolor, setBgColor] = useState<string>("");
  const {
    inboxClicked,
    setInboxClicked,
    conversations,
    addConversation,
    removeConversation,
  } = useContext(SideBarContext);
  const {
    UnArchive,
    clickUnarchive,
    addUnreadConversation,
    removeUnreadConversation,
    unreadOnes,
  } = useContext(SideBarContext);
  const [err, setErr] = useState<boolean>(false);
  const { setConvName, convName, setguestId } = useContext(MessengingContext);
  const [Archived, setArchived] = useState<boolean>(false);
  const [Unread, setUnread] = useState<boolean>(false);

  const [nameArchived, setNameArchived] = useState<string>();

  const HandleInboxClick = async () => {
    setConvName(username);
    setguestId(idNumber);
    setInboxClicked(!inboxClicked);
  };
  const [Conversation, Id] = username ? username.split(" ") : ["", ""];

  const idNumber = parseInt(Id, 10);

  const ArchiveChat = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    clickUnarchive(!UnArchive);
    setArchived(true);
    setNameArchived(username);
    console.log("Chat archived");
    localStorage.setItem("archivedchat", `${nameArchived}`);
    if (UnArchive === true) {
      addConversation(username);
    } else if (UnArchive === false) {
      removeConversation(username);
    }
  };
  const UnreadChat = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    // Inverser la valeur de Unread à chaque clic
    setUnread((prevState) => !prevState);
    // Utiliser la nouvelle valeur de Unread pour ajouter ou supprimer la conversation
    if (!Unread) {
      addUnreadConversation(username);
    }
    if (Unread === false && unreadOnes.includes(username)) {
      removeUnreadConversation(username);
    }
  };

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
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <div
          className="flex-none"
          style={{ marginTop: "-1rem", marginLeft: "-2rem" }}
        >
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              onClick={(e) => e.stopPropagation()}
            >
              ...
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={ArchiveChat}>{type}</a>
              </li>
              <li>
                <a onClick={UnreadChat}>{type2}</a>
              </li>
            </ul>
          </div>
        </div>{" "}
        <div
          className="ml-auto flex flex-col items-end"
          style={{
            marginLeft: "-2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className="text-sm text-gray-700">{nowText}</span>
          <div className="mt-2">
            <div className="relative">
              <span className="absolute top-0 right-0 -mt-2 -mr-1 inline-flex items-center bg-green-500 justify-center h-4 w-4 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
