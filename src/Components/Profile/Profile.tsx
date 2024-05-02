import React from "react";
import "./index.css";

interface Profile {
  Avatar: string;
}

const Profile: React.FC<Profile> = ({ Avatar }) => {
  return (
    <div
      className="profile-window"
      style={{
        width: "15rem",
        height: "22rem",
        backgroundColor: "#f3f4f6",
        padding: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={Avatar}></img>
      <h1 style={{ fontSize: "1rem", marginBottom: "1rem" }}>
        Small White Window
      </h1>
      <p style={{ fontSize: "1rem" }}>This is a small white window.</p>
    </div>
  );
};

export default Profile;
