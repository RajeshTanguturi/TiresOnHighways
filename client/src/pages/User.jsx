<<<<<<< HEAD
import React, { useState } from "react";
import Utable from "../pages/Utable";

const Inputpage = () => {
  const [regisNo, setregisNo] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [finalrno, setfinalrno] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setfinalrno(regisNo);
    setShowTable(true);
  };
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [regisNo, setregisNo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.open(`user/${regisNo}?regisNo=${regisNo}`, "_blank");
    };
>>>>>>> origin/main

  const handleRegisNoChange = (event) => {
    setregisNo(event.target.value);
  };

  return (
    <div className="user">
      <div className="card">
<<<<<<< HEAD
        <h2>Check your Reports</h2>
=======
        <h1>Input Form</h1>
>>>>>>> origin/main
        <form id="inputForm" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              placeholder="Enter registration Number"
              id="regno"
              name="regisNo"
              className="form-control"
              value={regisNo}
              onChange={handleRegisNoChange}
            />
            <label htmlFor="regno">
              <p>Registration Number</p>
            </label>
            <div>
              <br />
<<<<<<< HEAD
              <button type="submit" className="btn btn-success">
                Submit
              </button>
=======
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
>>>>>>> origin/main
            </div>
          </div>
        </form>
      </div>
<<<<<<< HEAD
      <div className="displaytable">
      {showTable && <Utable rno={finalrno} />}
      </div>
=======
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default Inputpage;
=======
export default User;
>>>>>>> origin/main
