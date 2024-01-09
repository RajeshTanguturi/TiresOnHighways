import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Tolluncle = () => {
  const [image, setImage] = useState(null);
  const [regisNo, setregisNo] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const submitImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("regisNo", regisNo);
    formData.append("phoneNo", phoneNo);
    console.log(formData);
    setphoneNo("");
    setregisNo("");
    setImage(null);
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
      toast.success("Data uploaded successfully");
      console.log("Response from server:", response.data);
    } catch (error) {
      toast.error("Error uploading data");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const updateRegisNo = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Allow only letters and numbers
    setregisNo(input);
    console.log(e);
    console.log(e.target.value);
  };
  const updatePhoneNo = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); // Allow only letters and numbers
    setphoneNo(input);
    console.log(e);
    console.log(e.target.value);
  };
  return (
    <div>
      <div className="toll" id="toll">
        <div className="card">
          <form onSubmit={submitImage}>
            <div className="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInputregisno"
                placeholder="Eg:TS31JA2004"
                value={regisNo}
                onChange={updateRegisNo}
              />
              <label for="floatingInputregisno">Registration number</label>
            </div>
            <div class="form-floating">
              <input
                type="tel"
                class="form-control"
                id="floatingPasswordphoneno"
                placeholder="phone number"
                value={phoneNo}
                onChange={updatePhoneNo}
              />
              <label for="floatingPasswordphoneno">Phone number</label>
            </div>
            <div>
              <div>
                <label htmlFor="input-file" className="upload">
                  Upload image
                </label>
              </div>
              <div className="selected-file-box">
                {image && <span>{image.name}</span>}
              </div>
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>
            <div>
              {loading ? (
                <p>loading...</p>
              ) : (
                image && phoneNo &&  regisNo && (
                  <div>
                    <button type="submit" class="btn btn-success">
                      submit
                    </button>
                  </div>
                )
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Tolluncle;
