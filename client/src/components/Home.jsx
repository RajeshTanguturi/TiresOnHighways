import React from "react";
import vg from "../assets/singletire.png";
import {HashLink} from 'react-router-hash-link'

import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
const Home = () => {
  return (
    <>
      <div className="home" id="Home">
        <main>
          <h1>Tires On Highways</h1>
          <p id="h1para">
          Tire Safety Redefined with Machine Learning
          </p>
          <br />
          <p>
          Our state-of-the-art model analyzes various factors, including tire conditions, wear and tear, and real-time data, to foresee potential risks. By leveraging machine learning algorithms, we can provide early warnings and insights that empower drivers to take proactive measures, ultimately reducing the likelihood of accidents.
          </p>
        <HashLink id="userredirect" to ={"/user"}>View Reports</HashLink>
        </main>
      </div>

      <div className="home2">
        <img src={vg} alt="Graphics" />
        <div>
          <p>
          Tire-related accidents are a significant concern, contributing to road incidents globally. By incorporating our machine learning solution, we aim to make roads safer, protect lives, and revolutionize the way we approach tire safety.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
