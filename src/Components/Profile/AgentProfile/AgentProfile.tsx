import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import supabase from "../../../Utils/api";
import { Link } from "react-router-dom";
import { SideBarContext } from "../../../Contexts/SideBarContext";

interface Profile {
  Avatar: string;
}

const AgentProfile: React.FC<Profile> = ({ Avatar }) => {
  const [userData, setUserData] = useState<any>();

  const retrieveUserData = async () => {
    try {
      const user = supabase.auth.getUser();
      const { data, error } = await supabase
        .from("Agents")
        .select("*")
        .eq("Email", (await user).data.user?.email);

      if (error) {
        throw error;
      }
      setUserData(data[0]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur:",
        error
      );
    }
  };

  return (
    <div
      className="profile-window"
      style={{
        width: "16rem",
        height: "26rem",
        backgroundColor: "white",
        borderColor: "#f3f4f6",
        padding: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-2rem",
        }}
      >
        {userData && (
          <img
            style={{
              width: "5.5rem",
              height: "6rem",
              borderRadius: "50%",
            }}
            src={userData?.PhotoUrl}
            alt="User Avatar"
          />
        )}
        {userData && (
          <h1 style={{ fontSize: "1rem", marginTop: "1rem" }}>
            {userData?.firstName} {userData?.lastName}
          </h1>
        )}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {" "}
          <p style={{ fontSize: "0.8rem", color: "grey", marginTop: "0.5rem" }}>
            Admin
          </p>
          <div
            style={{ display: "flex", gap: "0.5rem", marginLeft: "3.25rem" }}
          >
            <img
              style={{
                width: "1.3rem",
                height: "1.3rem",
                borderRadius: "50%",
                marginTop: "0.2rem",
              }}
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzUtMjUtcC5wbmc.png"
            ></img>{" "}
            <p
              style={{ fontSize: "0.8rem", color: "grey", marginTop: "0.5rem" }}
            >
              {userData?.PhoneNumber}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <img
              style={{
                width: "1.3rem",
                height: "1.3rem",
                borderRadius: "50%",
                marginTop: "0.2rem",
              }}
              src="https://thumbs.dreamstime.com/b/email-envelope-icon-vector-mail-message-symbol-isolated-transparent-background-email-envelope-icon-vector-black-mail-message-126372737.jpg"
            ></img>{" "}
            <p
              style={{
                fontSize: "0.8rem",
                color: "grey",
                marginTop: "0.5rem",
              }}
            >
              {userData?.Email}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          {" "}
          <Link to="/">
            {" "}
            <button
              style={{
                marginTop: "3rem",
                background: "#999999",
                width: "5rem",
                height: "1.5rem",
              }}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              Logout
            </button>
          </Link>
          <button
            style={{
              marginTop: "3rem",
              background: "#999999",
              width: "5rem",
              height: "1.5rem",
            }}
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
