import { PORT, mongodbURL } from "./config.js";
import TireSchema from "./schemas/crackedReport.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import tf from "@tensorflow/tfjs-node";
import sharp from "sharp";

const app = express();
let model;
const modelPath = "model.json";

async function loadModel() {
  try {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    if (model === undefined) {
      throw new Error("Model is undefined after loading.");
    }
    console.log("Model loaded");
  } catch (error) {
    console.error("Error loading the model:", error);
    throw error; // Propagate the error to the caller
  }
}


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("welcome to backend");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//handling post request
app.post("/upload", upload.single("image"), async (req, res) => {
  // console.log(req)
  console.log("post request recived");
  console.log(req.file);
  try {
    const regisNo = req.body.regisNo;
    const phoneNo = 988988988988;
    const tollPlaza = "exampletollplaza";
    const imagename = "exampleimagename";
    console.log(req.file);
    console.log(req.file.path);
    const processedImage = await sharp(req.file.path)
      .resize({ width: 128, height: 128 })
      .toBuffer();
    console.log("Image processed successfully.");
    //   res.json({ message: 'Image processed successfully.' });
    const inputTensor = tf.node.decodeImage(processedImage);
    const expandedTensor = inputTensor.expandDims();
    const normalizedTensor = expandedTensor.div(255.0);
    const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
    const predictions = model.predict(reshapedTensor);
    const label = predictions.dataSync()[0] > 0.5 ? "normal" : "cracked";
    // console.log({ label, confidence: predictions.dataSync()[0] * 100 });
    const damage = 100 - predictions.dataSync()[0] * 100;
    // res.send({ label, confidence: predictions.dataSync()[0] * 100 });

    try {
      // Check if a document with the same phoneNo and regisNo exists
      const existingTireReport = await TireSchema.findOne({ regisNo });
  
      if (existingTireReport) {
          // If it exists, append the new report to the existing reports array
          existingTireReport.reports.unshift({
              label,
              damage,
              tollPlaza,
              imagename,
          });

          // Save the updated document
          await existingTireReport.save();

          console.log("data appended to existing document");
          return res.status(200).send(existingTireReport);
      } else {
          // If it doesn't exist, create a new document
          const newTireReport = {
              regisNo: regisNo,
              phoneNo: phoneNo,
              reports: [{
                  label: label,
                  damage: damage,
                  tollPlaza: tollPlaza,
                  imageName: imagename,
              }],
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
    w;
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

    // const allSingleReports = singleTireReport.reports.map((report) => ({
    //   regisNo: singleTireReport.regisNo,
    //   phoneNo: singleTireReport.phoneNo,
    //   ...report.toObject(),
    // }));
    res.status(200).json(singleTireReport);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
});

startServer();

async function startServer() {
  try {
    await loadModel();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
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
    process.exit(1); // Exit the process if there's an error connecting to MongoDB
  }
}
