import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Feedback from "./components/Feedback";
import HeaderBS from "./components/HeaderBS";
import Tolluncle from "./pages/Tolluncle";
import User from "./pages/User";
import Dealer from "./pages/Dealer";
import TireTable from "./components/TiresTable";
import Testcomponent from "./components/Testcomponent";
import Usertable from "./pages/Usertable";

import "./styles/Loading.scss"
import "./styles/Tolluncle.scss"
import "./styles/User.scss"
import "./styles/App.scss";
import "./styles/Header.scss";
import "./styles/HeaderBS.scss";
import "./styles/Home.scss";
import "./styles/Footer.scss";
import "./styles/Feedback.scss";
import "./styles/mediaquery.scss";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <HeaderBS />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/tolluncle" element={<Tolluncle />} />
        <Route path="/dealer" element={<Dealer />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:regisNo" element={<Usertable />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
