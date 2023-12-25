import React from 'react'
import { useParams } from "react-router-dom";


const Testcomponent = () => {
  const { regisNo } = useParams();
  console.log(regisNo);
  return (
    <div>
        <h1>registration number is {regisNo}</h1>
    </div>
  )
}

export default Testcomponent