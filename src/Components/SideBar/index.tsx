import React, { useContext, useState } from "react";
import logo from "../../Assets/Images/logoAvia.png";
import inbox from "../../Assets/Images/inbox.png";
import analytics from "../../Assets/Images/analytics.png";
import flag from "../../Assets/Images/flag language.png";
import search from "../../Assets/Images/search.png";
import setting from "../../Assets/Images/settings .png";
import notifications from "../../Assets/Images//notif .png";
import archived from "../../Assets/Images/archived.png";
import "./index.css";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { AuthContext } from "../../Contexts/AuthContext";
import Logout from "../Logout";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button";
import Profile from "../../Components/Profile/Profile";
import Settings from "../Settings/Settings";

interface MessangingsidebarProps {
  backgroundColor?: string; // Define the type of backgroundColor prop
}

const Messangingsidebar: React.FC<MessangingsidebarProps> = ({
  backgroundColor,
}) => {
  const { clicked, setClicked, ArchiveClicked, clickArchive } =
    useContext(SideBarContext);
  const [myBooleanVariable, setMyBooleanVariable] = useState(false);
  const { loggedOut } = useContext(AuthContext);
  const [ProfileClicked, setProfileClicked] = useState<boolean>(false);
  const [logoInbox, setLogoinbox] = useState<boolean>(false);
  const [settings, settingsClicked] = useState<boolean>(false);
  const [chat, chatClicked] = useState<boolean>(false);
  const { showProfile, setShowProfile } = useContext(SideBarContext);
  const [archivedd, clickArchived] = useState(false);

  const handleClick = () => {
    const newClickedValue = !myBooleanVariable;
    setMyBooleanVariable(newClickedValue);
    setClicked(newClickedValue);
    console.log(clicked);
  };
  function hundleClickProfile() {
    setShowProfile(true);
  }
  function handleClickInbox() {
    setLogoinbox(!logoInbox);
    console.log(logoInbox);
  }
  console.log("la valeur de archivingggg est", ArchiveClicked);
  console.log("la valeur de archivingggg est", ArchiveClicked);

  return (
    <div className="SideBar" style={{ backgroundColor: backgroundColor }}>
      <div className="upperSide">
        <img src={logo} className="logo"></img>
        <div className="Inbox">
          <button onClick={() => chatClicked(!chat)}>
            <img src={inbox} className="photo"></img>
          </button>
          {chat && <Redirect to="/Messenging" />}
          <h6 className="title">Inbox</h6>
        </div>

        <div className="Settings">
          {" "}
          <button>
            {" "}
            <img
              src={setting}
              className="photo  "
              onClick={() => settingsClicked(!settings)}
            ></img>
          </button>
          <h6 className="title">Settings</h6>
        </div>
        {settings && <Redirect to="/Settings" />}
        <div className="Notifs">
          {" "}
          <button>
            {" "}
            <img src={notifications} className="photo  "></img>
          </button>
          <h6 className="title">Notifications</h6>
        </div>
        <div className="Archived">
          <button
            onClick={() => {
              clickArchive(!ArchiveClicked);
            }}
          >
            {" "}
            <img src={archived} className="photo"></img>
          </button>
          <h6 className="title">Archived</h6>
        </div>
      </div>
      <div className="lowerside">
        <button>
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="btn m-1">
              {" "}
              <img
                className="photo2 
   "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA9hKFHkeThXlgaoAjby9HKLjWxQMeQOgWIhZmlPodA&s"
              ></img>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={hundleClickProfile}>Logout</button>
              </li>
            </ul>
          </div>
        </button>
        <button>
          {" "}
          <img
            src={flag}
            className="photo 
 "
          ></img>
        </button>
        <button onClick={handleClick}>
          <img src={search} className="photo"></img>
        </button>
      </div>
      {showProfile && <Profile Avatar="bhdcgdiyz" />}
    </div>
  );
};
export default Messangingsidebar;
