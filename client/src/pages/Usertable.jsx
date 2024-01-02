import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import tire from "../assets/singletire.png";
<<<<<<< HEAD
import tiref from "../assets/flattire.png";

=======
import tiref from "../assets/flattire.png"
>>>>>>> origin/main
const Usertable = () => {
  const { regisNo } = useParams();
  const [Tirereport, setTirereport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/tirereports/${regisNo}`
        );
        setTirereport(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
<<<<<<< HEAD
  }, [regisNo,Tirereport]);
=======
  }, [regisNo]);
>>>>>>> origin/main

  return (
    <div>
      {isLoading && (
        <div className="spinner-loading container">
          <img src={tire} alt="loading..." />
          <h5>loading your beautiful tires</h5>
        </div>
      )}
<<<<<<< HEAD


=======
>>>>>>> origin/main
      {error && <div className="loading-error container">
          <img src={tiref} alt="Error..." />
          <h5>Error fetching data: {error.message}</h5>
        </div> }
<<<<<<< HEAD


=======
>>>>>>> origin/main
      {!isLoading && !error && { regisNo }}
    </div>
  );
};
export default Usertable;
