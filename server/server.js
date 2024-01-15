import { PORT, mongodbURL } from "./config.js";
import TireSchema from "./schemas/crackedReport.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import Jimp from "jimp";
import path from "path";
import tf from "@tensorflow/tfjs-node";
import fs from "fs/promises";

const app = express();
let model;
const modelPath = "./model/model.json";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("welcome to backend");
});

// function to store the request image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // console.log("at filename", req.body);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

// Function to crop image to square with minimum width
async function cropSquareMinWidth(inputImagePath, resizeto) {
  try {
    const image = await Jimp.read(inputImagePath);
    const minWidth = Math.min(image.getWidth(), image.getHeight());
    const targetSize = minWidth;
    const cropX = Math.floor((image.getWidth() - targetSize) / 2);
    const cropY = Math.floor((image.getHeight() - targetSize) / 2);

    // Crop the image in memory
    const croppedImage = image
      .clone()
      .crop(cropX, cropY, targetSize, targetSize);
    croppedImage.resize(resizeto, resizeto);
    const croppedImageBuffer = await croppedImage.getBufferAsync(
      Jimp.MIME_JPEG
    );

    return croppedImageBuffer;
  } catch (error) {
    console.error("Error cropping image:", error);
    throw error;
  }
}

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("post request recived");
    console.log(req.body);
    const imagePath = path.join("./public/uploads", req.file.filename);
    // Crop the image in memory
    const croppedImageBuffer = await cropSquareMinWidth(imagePath, 128);
    console.log("Image cropped successfully.");
    // seting the mime type
    // const image = croppedImageBuffer;
    // const precessedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    console.log("Image processed successfully by jimp.");
    // Decode the preprocessed image buffer
    const inputTensor = tf.node.decodeImage(croppedImageBuffer);
    // expand the dimensions of the input tensor to make it compatible with the model
    const expandedTensor = inputTensor.expandDims();
    // Normalize the pixel values by dividing them by 255.0, bringing them to the range [0, 1]
    const normalizedTensor = expandedTensor.div(255.0);
    // Reshape the tensor to the shape expected by the model ([1, 128, 128, 3])
    const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
    // Make predictions using the model on the reshaped tensor
    const predictions = model.predict(reshapedTensor);
    // Determine the label based on the predicted probability, using a threshold of 0.5
    // extracts the synchronous data
    const label = predictions.dataSync()[0] > 0.5 ? "normal" : "cracked";
    const damage = 100 - predictions.dataSync()[0] * 100;
    console.log("image successfully evaluated");

    try {
      const regisNo = req.body.regisNo;
      const phoneNo = req.body.phoneNo;
      const imageName = req.file.filename;
      const tollPlaza = "exampletollplaza";

      // Check if a document with the same phoneNo and regisNo exists
      const existingTireReport = await TireSchema.findOne({ regisNo });

      if (existingTireReport) {
        // If it exists, append the new report to the existing reports array
        existingTireReport.reports.unshift({
          label,
          damage,
          tollPlaza,
          imageName,
        });

        // Save the updated document
        await existingTireReport.save();

        console.log("data appended to existing document");
        return res.status(200).send(existingTireReport);
      } else {
        const newTireReport = {
          regisNo: regisNo,
          phoneNo: phoneNo,
          reports: [
            {
              label: label,
              damage: damage,
              tollPlaza: tollPlaza,
              imageName: imageName,
            },
          ],
        };

        const tireReport = await TireSchema.create(newTireReport);

        console.log("data sent to database");
        return res.status(201).send(tireReport);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: "Error processing request" });
    }
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

//getting - all document -all reports
app.get("/tirereports", async (req, res) => {
  console.log("got request for all reports");
  try {
    const allTireReports = await TireSchema.find();

    if (!allTireReports || allTireReports.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }

    // Map reports array to include common attributes
    const allIndividualReports = [];
    allTireReports.forEach((tireReport) => {
      const individualReports = tireReport.reports.map((report) => ({
        regisNo: tireReport.regisNo,
        phoneNo: tireReport.phoneNo,
        ...report.toObject(), // Includen] individual report attributes
      }));
      allIndividualReports.push(...individualReports);
    });

    res.status(200).json(allIndividualReports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
});

// getting - individual document by regisno -all reports
app.get("/tirereports/:regisNo", async (req, res) => {
  console.log("got request");
  try {
    const { regisNo } = req.params;

    const singleTireReport = await TireSchema.findOne({ regisNo });
    res.status(200).json(singleTireReport);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
});

app.get("/getimage/:imageName", async (req, res) => {
  try {
    console.log("got request for image");
    const { imageName } = req.params;
    if (!imageName) {
      res.status(400).send("Image name is missing in the request body");
      return;
    }
    console.log(imageName);
    const imagePath = path.join("./public/uploads", imageName);
    const fileExists = await fs
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      res.status(404).send("Image not found");
      return;
    }

    const imageBuffer = await fs.readFile(imagePath);

    // Determine the content type based on the file extension
    const fileExtension = path.extname(imageName).toLowerCase();
    let contentType = "image/jpeg"; // Default to JPEG
    if (fileExtension === ".jpeg" || fileExtension === ".jpg") {
      contentType = "image/jpeg";
    } else if (fileExtension === ".png") {
      contentType = "image/png";
    } else if (fileExtension === ".gif") {
      contentType = "image/gif";
    }

    // Set the appropriate content type for the image
    res.setHeader("Content-Type", contentType);

    // Send the image Buffer as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

startServer();

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    await loadModel();
    await mongodbload();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

async function mongodbload() {
  try {
    await mongoose.connect(mongodbURL);
    console.log("App connected to database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function loadModel() {
  try {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    if (model === undefined) {
      throw new Error("Model is undefined after loading.");
    }
    console.log("Model loaded");
  } catch (error) {
    console.error("Error loading the model:", error);
    throw error;
  }
}
