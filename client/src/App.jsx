import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componets/Header";
import Home from "./componets/Home";
import Footer from "./componets/Footer";
import Services from "./componets/Services";
import Feedback from "./componets/Feedback"

import "./styles/App.scss";
import "./styles/Header.scss";
import "./styles/Home.scss";
import "./styles/Footer.scss";
import "./styles/Feedback.scss";
import "./styles/mediaquery.scss"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
