import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowReport = () => {
  const [tire, setTire] = useState({});
  const { id } = useParams();

  useEffect(() => {
    
    axios
      .post(`http://localhost:8000/uploads/${id}`)
      .then((response) => {
        setTire(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Tire Report</h1>
      <div>
        <div>
          <span>Id : </span>
          <span>{tire._id}</span>
        </div>
        <div>
          <span>Registration No : </span>
          <span>{tire.regisNo}</span>
        </div>
        <div>
          <span>label : </span>
          <span>{tire.label}</span>
        </div>
        <div>
          <span>damage : </span>
          <span>{tire.damage}</span>
        </div>
        <div>
          <span>Toll : </span>
          <span>{tire.tollplaza}</span>
        </div>
        <div>
          <span>Phone No : </span>
          <span>{tire.phoneNo}</span>
        </div>
        <div>
          <span>Create Time : </span>
          <span>{new Date(tire.createdAt).toString()}</span>
        </div>
        <div>
          <span>Last Update Time : </span>
          <span>{new Date(tire.updatedAt).toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowReport;
