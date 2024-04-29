import React, { useContext } from "react";
import ActualUser from "../Components/RightSideBar/ActualUser/ActualUser";
import InputElem from "../Components/RightSideBar/InputElem/InputElem";
import SelectButton from "../Components/RightSideBar/selctButton/index";
import OneSegment from "../Components/RightSideBar/Segments/OneSegment";

import UserInfo from "../Components/RightSideBar/UserInfo/index";
import { SideBarContext } from "../Contexts/SideBarContext";
import supabase from "../Utils/api";
import { AuthContext } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Logout() {
  const { currentuser } = useContext(AuthContext);
  const [agent, setAgent] = useState<any>(null);
  const { sender } = useContext(SideBarContext);
  const { loggedOut, setLoggedout } = useContext(AuthContext);
  // Définir une interface pour les données des agents
  interface AgentData {
    firstName: string;
    lastName: string;
    Role: string;
    // Ajoutez d'autres propriétés au besoin
  }
  function hundleLogout() {
    setLoggedout(!loggedOut);
  }
  // Dans votre fonction ou composant où vous effectuez la requête supabase
  async function fetchData() {}

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "1.9rem" }}
    >
      <div style={{ width: "100%" }}>
        <ActualUser
          UserName={`${sender.firstName} ${sender.lastName}`}
          UrlAvatar="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          State="Available"
          colour="green"
        />
      </div>
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          maxHeight: "32rem",
          padding: "10px",
          marginTop: "0",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <SelectButton
            UrlImage1="url_image_1.jpg"
            UrlImage2="url_image_2.jpg"
            UrlImage3="url_image_3.jpg"
            Name="Assigned Operator"
            OperatorName1="Operator 1"
            OperatorName2="Operator 2"
            OperatorName3="Operator 3"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <InputElem
            Name="John Doe"
            UrlImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          ></InputElem>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",

              justifyContent: "space-between",
            }}
          >
            <UserInfo
              id={32644}
              Name="Mariem Smadhi"
              Mail="mariem.smadhi@example.com"
              Phone={123456789}
              CreatedAt="2023-01-15T08:00:00Z"
            />
          </div>
        </div>
      </div>
      <button onClick={hundleLogout}>Logout</button>
    </div>
  );
}
