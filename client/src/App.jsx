import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Feedback from "./components/Feedback";
import HeaderBS from "./components/HeaderBS";
import Toll from "./pages/Toll";
import User from "./pages/User";
import Dealer from "./pages/Dealer";
import TireTable from "./components/TiresTable";
import Testcomponent from "./components/Testcomponent";
import Usertable from "./pages/Usertable";
import Utable from "./pages/Utable"
import Aboutus from "./components/Aboutus";

import "bootstrap/dist/css/bootstrap.css";
import "./styles/Loading.scss"
import "./styles/Tolluncle.scss"
import "./styles/App.scss";
import "./styles/User.scss";
// import "./styles/HeaderBS.scss";
import "./styles/Home.scss";
import "./styles/Footer.scss";
import "./styles/Feedback.scss";
import "./styles/mediaquery.scss";
import "./styles/Header.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/tolluncle" element={<Toll />} />
        <Route path="/dealer" element={<Dealer />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:regisNo" element={<Usertable />} />
        <Route path ="/testing" element={<Utable/>} />
        <Route path ="/aboutus" element={ <Aboutus/> } />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

// import React from 'react'
// import BasicTable from './tests/BasicTable'
// import Utable from './pages/Utable'
// import 'bootstrap/dist/css/bootstrap.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import User from './pages/User';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element ={<User/>} />
//       <Route path="/userreport" element={<Utable />} />
//       {/* <BasicTable /> */}
//       {/* <Utable /> */}
//       </Routes>
//     </Router>
//   )
// }

// export default App;
