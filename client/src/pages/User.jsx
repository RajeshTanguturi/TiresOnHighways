import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [regisNo, setregisNo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.open(`user/${regisNo}?regisNo=${regisNo}`, "_blank");
    };

  const handleRegisNoChange = (event) => {
    setregisNo(event.target.value);
  };

  return (
    <div className="user">
      <div className="card">
        <h1>Input Form</h1>
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
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
