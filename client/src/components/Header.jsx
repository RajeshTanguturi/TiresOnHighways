import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/hamburgericon.png";

const Header = () => {
  const [toggle, setToggle] = useState("");

  const handleToggleClick = () => {
    if (toggle === "") {
      setToggle("open");
    } else {
      setToggle("");
    }
  };

  const handleLinkclick = () => {
    setToggle("");
  };
  return (
    <nav className="mynavbar">
      <div className="logo">
        <Link to="/">Tire Insights</Link>
      </div>
      <ul className="links">
        <li>
          <Link to={"/toll"}>Toll</Link>
        </li>
        <li>
          <Link to={"/user"}>User</Link>
        </li>
        <li>
          <Link to={"/dealer"}>Dealer</Link>
        </li>
        {/* <li>
          <Link to={"/services"}>Services</Link>
        </li> */}
        <li>
          <Link to={"/aboutUs"}>About Us</Link>
        </li>
        <li>
          <Link to={"/feedback"}>Feedback</Link>
        </li>
      </ul>
      <Link className="action_btn" to={"/feedback"}>
        Login
      </Link>
      <div className="toggle_btn" onClick={handleToggleClick}>
        {/* <i class="fa-solid fa-bars"></i> */}
        <img src={hamburger} height="40px" alt="menu" />
      </div>
      <div className={`dropdown_menu ${toggle}`}>
        <li>
          <Link onClick={handleLinkclick} to={"/toll"}>
            Toll
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/user"}>
            User
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/dealer"}>
            Dealer
          </Link>
        </li>
        <li>
          {/* <Link onClick={handleLinkclick} to={"/services"}>
            Services
          </Link> */}
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/aboutUs"}>
            About Us
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/feedback"}>
            Feedback
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLinkclick}
            className="action_btn_toggle"
            to={"/login"}
          >
            Login
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Header;
