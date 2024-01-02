function dateIST() {
  const currentDate = new Date();

  // Convert to Indian Standard Time (IST)
  const istTime = currentDate.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
  return istTime;
}

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      // required: true,
    },
    label: {
      type: String,
      required: true,
    },
    damage: {
      type: Number,
      required: true,
    },
    tollPlaza: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: dateIST,
    },
  }
);

const tireReportSchema = new mongoose.Schema({
  regisNo: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  reports: [reportSchema],
});

const TireSchema = mongoose.model("crackedreports", tireReportSchema);

export default TireSchema;
