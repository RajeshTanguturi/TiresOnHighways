import React from "react";
import { HashLink } from "react-router-hash-link";
// import { Link } from 'react-router-dom'
import mainlogo from "../assets/mainlogo.png";

const HeaderBS = () => {
  return (
    <nav className="navbar navbar-expand-lg" id="navbarbs">
      <div className="container-fluid">
        <HashLink className="navbar-brand" to="/#Home">
          {/* <img
            src={mainlogo}
            alt="TOH"
            width="40"
            height="32"
            className="d-inline-block align-text-top"
          /> */}
          Tread Insights
        </HashLink>
        <button
          className="navbar-toggler"
          id="togglebutton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="toggleicon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/#aboutUs"}
              >
                About Us
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/services"}
              > */}
                {/* Services
              </HashLink> */}
            {/* </li> */}
            

            <li className="nav-item">
              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/tolluncle"}
              >
                Toll Plaza
              </HashLink>
            </li>
            <li className="nav-item">

              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/user"}
              >
                User
              </HashLink>
            </li>

            <li className="nav-item">

              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/dealer"}
              >
                Dealer
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/aboutus"}
              >
                About Us 
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                className="nav-link active"
                aria-current="page"
                to={"/feedback"}
              >
                Feedback
              </HashLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderBS;
