import axios from "axios";
import React, { useState } from "react";
const Tolluncle = () => {
  const [image, setImage] = useState(null);
  const [regisNo, setregisNo] = useState("");
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("regisNo", regisNo);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5555/upload",
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadImage = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const uploadregisNo = (e) => {
    console.log(e);
    console.log(e.target.value);
    setregisNo(e.target.value);
  };
  return(
    <div className="toll" id="toll">
        <div className="card">
          <form onSubmit={submitImage}>
            <div className="form-floating">
              <input
                type="text"
                placeholder="Enter reg number"
                id="regno"
                className="form-control"
                onChange={uploadregisNo}
              />
              <label for="regno">
                <p>Registration Number </p>
              </label>
            </div>
            <div>
              <div>
                <label htmlFor="input-file" className="upload">
                  {" "}
                  Upload image
                </label>
              </div>
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>
            <div>
              <button type="submit" class="btn btn-success">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Tolluncle;
