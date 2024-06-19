import React, { ReactNode, useContext, useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import Button from "../../Components/Button";
import YellowBand from "../../Components/YellowBand";
import Inbox from "../../Components/ChatBar/Inbox";
import threedots from "../../Assets/Images/threedots.png";
import ChatRoom from "../../Components/ChatRoom/ChatRoom";
import RightSideBar from "../../Components/RightSideBar";
import "./index.css";
import { SideBarContext } from "../../Contexts/SideBarContext";
import SearchBar from "../../Components/Search";
import Logout from "../../Components/Logout";
import ListOfInbox from "../../Components/ListOfInbox/ListOfInbox";
import { AuthContext } from "../../Contexts/AuthContext";
import { Session } from "@supabase/supabase-js";
import supabase from "../../Utils/api";
import { MessengingContext } from "../../Contexts/MessengingContext";
import ArchivedChats from "../../Components/ArchivedChats/ArchivedChats";
interface MessagingProps {
  children?: ReactNode;
}

const Messenging: React.FC<MessagingProps> = ({ children }) => {
  const { ArchiveClicked, UnRead, clickUnread } = useContext(SideBarContext);
  const { clickedName } = useContext(SideBarContext);
  const { clicked, sender } = useContext(SideBarContext);
  const { currentuser, setCurrentuser, loggedOut } = useContext(AuthContext);
  const [userFirstname, setUserFirstname] = useState<String>("");
  const [userLastname, setUserLastname] = useState<String>("");
  const { logoInbox, setLogoinbox } = useContext(SideBarContext);
  const { guestId } = useContext(MessengingContext);
  const [unreadSelected, setUnreadSelected] = useState<boolean>(false);
  const [SelectAll, setSelectAll] = useState<boolean>(true);
  const [SelectResolved, setSelectResolved] = useState<boolean>(false);
  const [SelectUnResolved, setSelectUnResolved] = useState<boolean>(false);

  const storedConversationId = localStorage.getItem("conversationId");
  const [selectedButton, setSelectedButton] = useState("All");
  const [unread, setunread] = useState<boolean>(false);

  const handleClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    return {}; // Retourner un objet vide
  };

  {
    /*let mainComponent;
  if (clicked) {
    mainComponent = <SearchBar />;
  } else if (ArchiveClicked) {
    mainComponent = <ArchivedChats />;
  } else {
    mainComponent = <ListOfInbox />;
  }*/
  }
  useEffect(() => {
    getChat();
  }, []);
  useEffect(() => {
    console.log("Interactinng with :", storedConversationId);
  });
  const getChat = async () => {
    try {
      const { data, error } = await supabase
        .from("Agents")
        .select("firstName , lastName")
        .eq("Email", currentuser?.email);

      if (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } else {
        if (data && data.length > 0) {
          const agentData = data[0];
          setUserFirstname(agentData.firstName);
          setUserLastname(agentData.lastName);
        } else {
          console.log("Aucun utilisateur trouvé avec cet e-mail.");
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  console.log(logoInbox);
  const arch = localStorage.getItem("archivedchat");
  // Le tableau vide [] signifie que cet effet ne se déclenchera qu'une seule fois après le premier rendu

  // Plus loin dans votre composant...

  return (
    <div className="MessengingContainer">
      <div className="SideBar" style={{ width: "4%" }}>
        <SideBar />
      </div>
      <div
        className="BoxContainer Box"
        style={{
          maxHeight: "100%",
          width: "21%",
          display: "flex",
          padding: "10px 15px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          alignSelf: "stretch",
        }}
      >
        <div style={{ width: "100%" }} className="wawa">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.37rem",
                justifyContent: "space-between",
              }}
            >
              <Button
                size="small"
                content="All"
                bgcolor={
                  selectedButton === "All" && !UnRead ? "#E73838" : "white"
                }
                colour={selectedButton === "All" && !UnRead ? "white" : "black"}
                onClick={() => {
                  handleClick("All");
                  return {};
                }}
              />
              <Button
                size="small"
                content="Unread"
                bgcolor={UnRead ? "#E73838" : "white"}
                colour={UnRead ? "white" : "black"}
                onClick={() => {
                  handleClick("Unread");
                  setunread(!unread);
                  clickUnread(!UnRead);
                  return {};
                }}
              />
              <Button
                size="small"
                content="Unresolved"
                bgcolor={
                  selectedButton === "Unresolved" && !UnRead
                    ? "#E73838"
                    : "white"
                }
                colour={
                  selectedButton === "Unresolved" && !UnRead ? "white" : "black"
                }
                onClick={() => {
                  handleClick("Unresolved");
                  return {};
                }}
              />
              <Button
                size="small"
                content="Resolved"
                bgcolor={
                  selectedButton === "Resolved" && !UnRead ? "#E73838" : "white"
                }
                colour={
                  selectedButton === "Resolved" && !UnRead ? "white" : "black"
                }
                onClick={() => {
                  handleClick("Resolved");
                  return {};
                }}
              />
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <circle cx="10" cy="5" r="1" />
                      <circle cx="10" cy="10" r="1" />
                      <circle cx="10" cy="15" r="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="YellowBand">
          {" "}
          <YellowBand></YellowBand>
        </div>

        <span
          style={{
            width: "100%",
            maxHeight: "34rem",
            overflowY: "auto",
            height: "100%",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {children}
          </div>
        </span>
      </div>

      <div
        style={{
          marginTop: "0.09rem",
          height: "100%",
          width: !clickedName ? "800rem" : "52%",
        }}
        className="chatRoom"
      >
        <ChatRoom imageReceiver="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
      <div
        className="RightSideBar"
        style={{
          maxHeight: "100%",
          width: "24%",
          overflowY: "scroll",
        }}
      >
        {clickedName && (
          <RightSideBar UrlAvatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        )}
      </div>
    </div>
  );
};
export default Messenging;
