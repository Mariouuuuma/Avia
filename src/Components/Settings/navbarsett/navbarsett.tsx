import React, { useContext } from "react";
import threedots from "../../Assets/Images/threedots.png";

interface NavbarProps {
  status?: string;
  Image?: string;
}
const NavBarSett: React.FC<NavbarProps> = ({ status, Image }) => {
  return (
    <div className="navbar bg-white" style={{ width: "69rem" }}>
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          ></div>
        </div>
        <div className="ml-2">
          <button>
            {" "}
            <a className="btn btn-ghost text-xl text-black"> Account</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarSett;
