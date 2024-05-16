import React, { useState } from "react";

interface SettingProps {
  namesetting: string;
  icon: string;
  bgcolor: string;
  description: string;
  onClick?: () => void;
}

const Setting: React.FC<SettingProps> = ({
  namesetting,
  icon,
  description,
  bgcolor,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-start  border border-gray-200 rounded p-3 mb-4 whiteBackground"
      style={{
        backgroundColor: hovered ? "#f3f3f3" : "white",
        width: "16rem",
        borderRadius: "7%",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: bgcolor,
              width: "2rem",
              height: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginTop: "0.25rem",
              }}
              alt="Avatar"
              src={icon}
              className=" rounded-full"
            />
          </div>
        </a>
        <div className="ml-4 flex flex-col space-y-2">
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <span
              className="text-sm text-gray-700"
              style={{ marginRight: "1rem", marginLeft: "-1rem" }}
            >
              {namesetting}
            </span>
          </div>

          <span
            style={{ marginRight: "1.5rem" }}
            className="text-xs text-gray-500"
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Setting;
