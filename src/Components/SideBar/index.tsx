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
interface MessangingsidebarProps {
  backgroundColor?: string; // Define the type of backgroundColor prop
}

const Messangingsidebar: React.FC<MessangingsidebarProps> = ({
  backgroundColor,
}) => {
  const { clicked, setClicked } = useContext(SideBarContext);
  const [myBooleanVariable, setMyBooleanVariable] = useState(false);
  const { loggedOut } = useContext(AuthContext);
  const [ProfileClicked, setProfileClicked] = useState<boolean>(false);
  const [logoInbox, setLogoinbox] = useState<boolean>(false);

  const handleClick = () => {
    const newClickedValue = !myBooleanVariable;
    setMyBooleanVariable(newClickedValue);
    setClicked(newClickedValue);
    console.log(clicked);
  };
  function hundleClickProfile() {
    setProfileClicked(!ProfileClicked);
  }
  function handleClickInbox() {
    setLogoinbox(!logoInbox);
    console.log(logoInbox);
  }
  return (
    <div className="SideBar" style={{ backgroundColor: backgroundColor }}>
      <div className="upperSide">
        <img src={logo} className="logo"></img>
        <div className="Inbox">
          <button onClick={handleClickInbox}>
            <img src={inbox} className="photo"></img>
          </button>
          <h6 className="title">Inbox</h6>
        </div>
        <div className="Analytics">
          {" "}
          <button>
            <img src={analytics} className="photo  "></img>
          </button>
          <h6 className="title">Analytics</h6>
        </div>
        <div className="Settings">
          {" "}
          <button>
            {" "}
            <img src={setting} className="photo  "></img>
          </button>
          <h6 className="title">Settings</h6>
        </div>
        <div className="Notifs">
          {" "}
          <button>
            {" "}
            <img src={notifications} className="photo  "></img>
          </button>
          <h6 className="title">Notifications</h6>
        </div>
        <div className="Archived">
          <button>
            {" "}
            <img src={archived} className="photo  "></img>
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
                <button onClick={hundleClickProfile}>Profile</button>
              </li>

              <li>
                <Link to="./" className="logout-link">
                  Logout
                </Link>
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
      {ProfileClicked && <Profile Avatar="bhdcgdiyz" />}
    </div>
  );
};
export default Messangingsidebar;
