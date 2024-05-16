import React, { useContext, useState } from "react";
import Tunisair from "../../../Assets/Images/tunisair.png";
import inbox from "../../../Assets/Images/inbox.png";

import flag from "../../../Assets/Images/flag language.png";
import search from "../../../Assets/Images/search.png";
import setting from "../../../Assets/Images/settings .png";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
interface MessangingsidebarProps {
  backgroundColor?: string; // Define the type of backgroundColor prop
}

const Messangingsidebar: React.FC<MessangingsidebarProps> = ({
  backgroundColor,
}) => {
  const { clicked, setClicked } = useContext(SideBarContext);
  const [myBooleanVariable, setMyBooleanVariable] = useState(false);
  const { loggedOut } = useContext(AuthContext);

  const handleClick = () => {
    const newClickedValue = !myBooleanVariable;
    setMyBooleanVariable(newClickedValue);
    setClicked(newClickedValue);
    console.log(clicked);
  };

  return (
    <div
      className="SideBarCli"
      style={{
        backgroundColor: backgroundColor,
        height: "100vh",
        paddingBottom: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div className="upperSideCli">
        <img src={Tunisair} className="logoCli"></img>
        <div className="InboxCli"></div>

        <div className="SettingsCli">
          {" "}
          <button>
            {" "}
            <img src={setting} className="photoCli  "></img>
          </button>
          <h6 className="titleCli">Settings</h6>
        </div>

        <div className="ArchivedCli"></div>
      </div>
      <div className="lowersideCli">
        <button>
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="btn m-1">
              {" "}
              <img
                className="photo2Cli 
   "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA9hKFHkeThXlgaoAjby9HKLjWxQMeQOgWIhZmlPodA&s"
              ></img>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="./" className="logout-linkCli">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </button>
        <button>
          {" "}
          <img
            src="https://vedi-express.twic.pics/119747-large_default/france-flag.jpg?twic=v1/resize=760"
            className="photoCli 
 "
          ></img>
        </button>
        <button onClick={handleClick}>
          <img src={search} className="photoCli"></img>
        </button>
      </div>
    </div>
  );
};
export default Messangingsidebar;
