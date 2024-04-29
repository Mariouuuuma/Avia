import React, { useContext } from "react";
import threedots from "../../Assets/Images/threedots.png";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { AuthContext } from "../../../Contexts/AuthContext";
interface NavbarProps {
  status: string;
  Image: string;
}
const NavBar: React.FC<NavbarProps> = ({ status, Image }) => {
  const { sender, receiver, clickedName, setClickedname } =
    useContext(SideBarContext);

  const handleInboxClick = async () => {
    try {
      setClickedname(!clickedName); // Inverser l'état du clic de l'Inbox
      console.log("Inbox clicked!");
    } catch (error) {
      console.error("Erreur lors du clic :", error);
    }
  };

  return (
    <div className="navbar bg-white">
      {/* Avatar and user info */}
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={Image} />
            </div>
          </div>
        </div>
        <div className="ml-2">
          <button onClick={handleInboxClick}>
            {" "}
            <a
              className="btn btn-ghost text-xl text-black"
              defaultValue="AviaHelper"
            >
              AviaHelper
            </a>
          </button>
        </div>
      </div>
      {/* Resolved button */}
      <div className="flex-none ml-auto">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary bg-white focus:outline-none"
            style={{ border: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            ></svg>
          </div>
        </div>
      </div>
      {/* Menu button */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
  );
};

export default NavBar;
