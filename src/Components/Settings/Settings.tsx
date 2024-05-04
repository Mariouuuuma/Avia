import React, { ReactNode, useContext, useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import Button from "../../Components/Button";
import YellowBand from "../../Components/YellowBand";
import Inbox from "../../Components/ChatBar/Inbox";
import threedots from "../../Assets/Images/threedots.png";
import ChatRoom from "../../Components/ChatRoom/ChatRoom";

import "../../Components/Settings/index.css";
import { SideBarContext } from "../../Contexts/SideBarContext";
import SearchBar from "../../Components/Search";
import Logout from "../../Components/Logout";
import ListOfInbox from "../../Components/ListOfInbox/ListOfInbox";
import { AuthContext } from "../../Contexts/AuthContext";
import { Session } from "@supabase/supabase-js";
import supabase from "../../Utils/api";
import NavBar from "../NavBar/NavBar";
import NavBarSett from "./navbarsett/navbarsett";

interface MessagingProps {
  children: ReactNode;
}

export default function Settings() {
  const { clickedName } = useContext(SideBarContext);
  const { clicked, sender } = useContext(SideBarContext);
  const { currentuser, setCurrentuser, loggedOut } = useContext(AuthContext);
  const [userFirstname, setUserFirstname] = useState<String>("");
  const [userLastname, setUserLastname] = useState<String>("");
  const { logoInbox, setLogoinbox } = useContext(SideBarContext);

  let mainComponent;
  if (clicked) {
    mainComponent = <SearchBar />;
  } else if (loggedOut) {
    mainComponent = <Logout />;
  } else {
    mainComponent = <ListOfInbox />;
  }
  useEffect(() => {
    getChat();
  }, []);

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
  return (
    <div className="MessengingContainer" style={{ display: "flex" }}>
      <div
        className="SideBar"
        style={{ width: "4%", backgroundColor: "white" }}
      >
        <SideBar />
      </div>
      <div
        className="BoxContainer"
        style={{
          maxHeight: "100%",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginLeft: "0.9rem",
          backgroundColor: "white",
          alignSelf: "stretch",
          padding: "10px 15px",
        }}
      >
        <p
          style={{
            position: "relative",
            top: "-47.3%",
            left: "4%",
            display: "flex",
            marginRight: "10rem",
          }}
          className="btn btn-ghost text-xl text-black"
        >
          Settings
        </p>
      </div>

      <div>
        <NavBarSett />
      </div>
    </div>
  );
}
