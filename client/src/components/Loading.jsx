import React from "react";

import loadingImage from "../assets/singletire.png";
const Loading = () => {
  return (
    <div id="loading">
      <img src={loadingImage} class="img-fluid rounded-top" alt="image" />
    </div>
  );
};
export default Loading;
