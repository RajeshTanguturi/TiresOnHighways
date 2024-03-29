import React from "react";
import vg from "../assets/singletire.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="hero">
      <div className="home" id="Home">
        <main>
          <h1>Tires On Highways</h1>
          <p>Tire Safety Redefined with Machine Learning</p>
          <br />
          <Link id="userredirect" to={"/user"}>
            View Reports
          </Link>
        </main>
      </div>

      <div className="home2">
        <img src={vg} alt="Graphics" />
        <div>
          <h1>Addressing our Challenge</h1>
          <p>
            Tire-related accidents pose a considerable threat, playing a
            significant role in road incidents worldwide. Our machine learning
            solution seeks to enhance road safety, safeguard lives, and
            transform the paradigm of addressing tire-related safety concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
