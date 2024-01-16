import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Modal.scss";

const Modal = ({ onClose, imageName }) => {
  const [image, setImage] = useState(null);
  const [isAccurate, setIsAccurate] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const handleToggle = () => {
    setIsAccurate((prev) => !prev);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData;
    formData.append("accurate",isAccurate);
    formData.append("feedback",feedback);
    formData.append("imageName",imageName);
    console.log(formData);
    try{
      const response = await axios.post(
        "http://localhost:5555/imagefeedback",
        formData,
        {
          headers: {
            "Content-Type":"application/json"
          }
        }
      );
      setIsAccurate(false);
      setFeedback("");
      toast.success("Feedback sent successfully");
      console.log("Response from server:", response.data);
    }
    catch(error){
      toast.error("Error sending Feedback");
      console.error("Error sending Feedback:", error);
    }
  };
  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!imageName || typeof imageName !== "string") {
          console.error("Invalid imageName:", imageName);
          return;
        }

        const response = await axios.get(
          `http://localhost:5555/getimage/${imageName}`,
          {
            responseType: "arraybuffer", // Specify the response type as arraybuffer for binary data
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("image response", response);
        // Convert the binary image data to a base64 string
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // Determine the content type based on the file extension
        const fileExtension = imageName.split(".").pop().toLowerCase();
        let contentType = `image/${
          fileExtension === "jpg" ? "jpeg" : fileExtension
        }`;

        // Set the base64 image string to the state
        setImage(`data:${contentType};base64,${base64Image}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [imageName]);

  return (
    <div className="mymodal">
      <div className="mymodalcontent">
        <h1>Tire Image</h1>
        {image ? (
          <>
            <img src={image} alt="Server Provided Image" />
            <form onSubmit={handleSubmit}> 
              <div className="toggle-container">
                <label>
                  Accurate
                  <input
                    type="checkbox"
                    checked={isAccurate}
                    onChange={handleToggle}
                  />
                </label>
              </div>
              <div className="feedback-container">
                <label>Feedback:</label>
                <textarea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Provide your feedback..."
                ></textarea>
              </div>
              <button id="submitbutton" type="submit">
                Submit
              </button>
            </form>
          </>
        ) : (
          <div style={{ height: "50%", width: "50%" }}>
            <h5>No Image Found</h5>
          </div>
        )}
        <span id="closebutton" onClick={handleModalClose}>
          &times;
        </span>
        {/* <i id="closebutton" onClick={handleModalClose} className="bi bi-x-square-fill"></i> */}
        {/* <i class="bi bi-x-square-fill"></i> */}
        {/* <button id="closebutton" onClick={handleModalClose}>Close</button> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
