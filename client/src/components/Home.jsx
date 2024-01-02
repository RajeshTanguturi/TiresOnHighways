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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            quisquam cupiditate repellat eius quia, a, excepturi atque
            exercitationem suscipit asperiores amet totam, enim fugit
            repellendus. Exercitationem excepturi reprehenderit tenetur
            incidunt.
          </p>
        <HashLink id="userredirect" to ={"/user"}>Check my Reports</HashLink>
        </main>
      </div>

      <div className="home2">
        <img src={vg} alt="Graphics" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolore assumenda voluptatibus, reiciendis alias numquam cupiditate
            minus, deserunt velit tempora laboriosam praesentium ex illo
            provident, earum nisi magni. In, quibusdam.
          </p>
        </div>
      </div>

      <div className="home3" id="aboutUs">
        <div>
          <h1>Who we are?</h1>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda libero esse ea consectetur. Dolor nam non eos deleniti et unde odio accusantium quasi dolorum nulla, odit quibusdam ad ab facere velit corporis autem cumque. Enim doloribus dolor dolorem. Numquam, quibusdam error harum corrupti doloribus sunt officiis quaerat nam praesentium voluptas vero voluptatem illum! Veniam magni laudantium illo voluptatem sint alias cumque. Quo vel, ipsam laudantium natus cupiditate distinctio aperiam asperiores. Omnis eos, ab ipsam ea debitis, atque distinctio ratione labore ad consectetur fugit reiciendis voluptas quam placeat quod optio nihil expedita at magni delectus. Vero libero itaque voluptatem optio ad.
          </p>
        </div>
      </div>

      <div className="home4" id="contactUs">
        <div>
          <h1>Contact Us</h1>
          <article>
            <div style ={{
              animationDelay : "0.3s"
            }}>
              <AiFillGoogleCircle  />
              <p>Google</p>
            </div>
            <div style ={{
              animationDelay : "0.5s"
            }}>
              <AiFillTwitterCircle />
              <p>Twitter</p>
            </div>
            <div style ={{
              animationDelay : "0.7s"
            }}>
              <AiFillYoutube  />
              <p>You Tube</p>
            </div>
            <div style ={{
              animationDelay : "1s"
            }}>
              <AiFillInstagram  />
              <p>Instagram</p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default Home;
