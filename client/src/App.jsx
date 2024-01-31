import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Toll from "./pages/Toll";
import User from "./pages/User";
import Dealer from "./pages/Dealer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Feedback from "./components/Feedback";
import Utable from "./components/Utable";
import Aboutus from "./components/Aboutus";

import "bootstrap/dist/css/bootstrap.css";
import "./styles/Aboutus.scss";
import "./styles/Loading.scss";
import "./styles/Toll.scss";
import "./styles/App.scss";
import "./styles/User.scss";
import "./styles/Dealer.scss";
import "./styles/Home.scss";
import "./styles/Footer.scss";
import "./styles/Feedback.scss";
import "./styles/Header.scss";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/toll" element={<Toll />} />
        <Route path="/dealer" element={<Dealer />} />
        <Route path="/user" element={<User />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/loading" element={<Loading />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
