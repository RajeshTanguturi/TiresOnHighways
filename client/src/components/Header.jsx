import React, { useState } from "react";
// import { Link } from 'react-router-dom'
import { HashLink } from "react-router-hash-link";
// import "../styles/Header.scss";
import mainlogo from "../assets/toggleicon.png";

const Header = () => {
  const [toggle, setToggle] = useState("");

  const handleToggleClick = () => {
    if (toggle === "") {
      setToggle("open");
    } else {
      setToggle("");
    }
  };

  return (
    <nav className="mynavbar">
      <div className="logo">
        <HashLink to="/">Tread Insights</HashLink>
      </div>
      <ul className="links">
        <li>
          <HashLink to={"/toll"}>Toll</HashLink>
        </li>
        <li>
          <HashLink to={"/user"}>User</HashLink>
        </li>
        <li>
          <HashLink to={"/dealer"}>Dealer</HashLink>
        </li>
        <li>
          <HashLink to={"/services"}>Services</HashLink>
        </li>
        <li>
          <HashLink to={"/aboutUs"}>About Us</HashLink>
        </li>
        <li>
          <HashLink to={"/feedback"}>Feedback</HashLink>
        </li>
      </ul>
      <HashLink className="action_btn" to={"/feedback"}>
        Login
      </HashLink>
      <div className="toggle_btn" onClick={handleToggleClick}>
        {/* <i class="fa-solid fa-bars"></i> */}
        <img src={mainlogo} height="40px" alt="menu" />
      </div>
      <div className={`dropdown_menu ${toggle}`}>
        <li>
          <HashLink to={"/toll"}>Toll</HashLink>
        </li>
        <li>
          <HashLink to={"/user"}>User</HashLink>
        </li>
        <li>
          <HashLink to={"/dealer"}>Dealer</HashLink>
        </li>
        <li>
          <HashLink to={"/services"}>Services</HashLink>
        </li>
        <li>
          <HashLink to={"/aboutUs"}>About Us</HashLink>
        </li>
        <li>
          <HashLink to={"/feedback"}>Feedback</HashLink>
        </li>
        <li>
          <HashLink className="action_btn_toggle" to={"/login"}>
            Login
          </HashLink>
        </li>
      </div>
    </nav>
  );
};

export default Header;
