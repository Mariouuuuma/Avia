import React from "react";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Session } from "inspector";
import supabase from "../../../Utils/api";
import SideBar from "../../../Components/SideBar";
import Button from "../../../Components/Button";
import ChatRoom from "../../../Components/ChatRoom/ChatRoom";
import image from "../../../Assets/Images/logoAvia.png";
import ChatRoomCli from "../ChatRoom/ChatRoomCli";
import SideBarCli from "../SideBarCli/SideBarCli";
import "../Pages/index.css";
export default function MessengingClient() {
  const { clickedName } = useContext(SideBarContext);
  const { clicked, sender } = useContext(SideBarContext);
  const { currentuser, loggedOut } = useContext(AuthContext);
  const [userFirstname, setUserFirstname] = useState<String>("");
  const [userLastname, setUserLastname] = useState<String>("");

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    try {
      const user = await supabase.auth.getUser();

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

  return (
    <div className="MessengingContainerCli">
      <div className="SideBarCli" style={{ width: "4%", marginLeft: "1rem" }}>
        <SideBarCli backgroundColor="white" />
      </div>

      <div
        style={{
          height: "100%",
          width: "90%", // 100% - la largeur de la barre latérale
          marginRight: "2px", // Un tout petit espace entre la chatroom et la barre latérale
          marginTop: "1.41rem",
          marginLeft: "2rem",
        }}
        className="chatRoomCli"
      >
        <ChatRoomCli imageReceiver={image} />
      </div>
    </div>
  );
}
