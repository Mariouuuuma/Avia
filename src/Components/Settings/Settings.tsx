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
import Setting from "./Setting/Setting";
import Account from "../../Assets/Images/account.png";
import bell from "../../Assets/Images/bell.png";
import users from "../../Assets/Images/users.png";
import message from "../../Assets/Images/message.png";
import Formulaire from "./Formulaire/EditInfo";
import TeamManage from "../../Pages/Partieclient/TeamManage/TeamManage";

interface MessagingProps {
  children: ReactNode;
}

export default function Settings() {
  const { clickedName } = useContext(SideBarContext);
  const { clicked, sender } = useContext(SideBarContext);
  const { currentuser, setCurrentuser, loggedOut } = useContext(AuthContext);
  const [userFirstname, setUserFirstname] = useState<string>("");
  const [userLastname, setUserLastname] = useState<string>("");
  const { logoInbox, setLogoinbox } = useContext(SideBarContext);
  const [connectedUser, getConnectedUser] = useState<any>();
  const [Admin, setIsAdmin] = useState<boolean>(false);
  const { showForm, setShowForm, showTeam, clickShowTeam } =
    useContext(SideBarContext);

  const handleClick = () => {
    setShowForm(!showForm);
    clickShowTeam(false);
  };

  const handleClickTeam = () => {
    clickShowTeam(!showTeam);
    setShowForm(false);
  };

  const getActualUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    getConnectedUser(user);
  };

  useEffect(() => {
    getActualUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (connectedUser && connectedUser.email) {
          const { data, error } = await supabase
            .from("Agents")
            .select("Role")
            .eq("Email", connectedUser.email);

          if (error) {
            console.log("Erreur lors de la récupération du rôle:", error);
            return;
          }

          if (data && data.length > 0) {
            const role = data[0].Role;
            if (role === "Admin") {
              setIsAdmin(true);
            }
          }
        }
      } catch (error) {
        console.log(
          "Une erreur s'est produite lors de la récupération du rôle:",
          error
        );
      }
    };

    fetchUser();
  }, [connectedUser]);

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
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "-9.8rem",
          }}
        >
          <p
            style={{
              position: "relative",
              top: "-50.3%",
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
          <Setting
            namesetting="Account"
            icon={Account}
            description="Profile, Name, Email, Password"
            bgcolor="#ED3863"
            onClick={handleClick}
          />
          <Setting
            namesetting="Notifications"
            icon={bell}
            description="Manage Your Notifications"
            bgcolor="#FCC102"
          />
          {Admin && (
            <Setting
              namesetting="Users"
              icon={users}
              onClick={handleClickTeam}
              description="Manage Your Team"
              bgcolor="#7B00C6"
            />
          )}
          <Setting
            namesetting="Shortcut Message"
            icon={message}
            description="Manage Your Saved Shortcut"
            bgcolor="#7BC600"
          />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <NavBarSett />
        {showForm && (
          <div style={{ position: "absolute", top: "2%", right: "-10%" }}>
            <Formulaire />
          </div>
        )}
        {showTeam && (
          <div style={{ position: "absolute", top: "4%", right: "-40%" }}>
            <TeamManage />
          </div>
        )}
      </div>
    </div>
  );
}
