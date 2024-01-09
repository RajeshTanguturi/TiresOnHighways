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
  
  const handleRegisNoChange = (event) => {
    setregisNo(event.target.value);
  };

  return (
    <div className="user">
      <div className="card">
        <h2>Tire Reports</h2>
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
      <div className="displaytable">
      {showTable && <Utable rno={finalrno} />}
      </div>
    </div>
  );
};

export default Inputpage;
