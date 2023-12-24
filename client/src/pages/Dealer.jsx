import React, { useEffect, useState } from "react";
import axios from "axios";
import TireTable from "../components/TiresTable";

const Home = () => {
  const [tires, setTires] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/tirereports")
      .then((response) => {
        setTires(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1>Table</h1>
      <TireTable tires={tires} />
    </div>
  );
};

export default Home;
