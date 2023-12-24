import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const User = () => {
  const [Tirereport, setTirereport] = useState({});
  const [regisNo, setregisNo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5555/tirereports/${regisNo}`
      );
      setTirereport(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
              type="text" // Handle changes to the input
              placeholder="Enter registration Number"
              id="regno"
              name="regisNo"
              className="form-control"
              value={regisNo} // Bind the input value to the state
              onChange={handleRegisNoChange}
            />
            <label for = "regno">
              <p>Registration Number</p>
            </label>
            <div>
              <br />
            <button type="submit"  class="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
