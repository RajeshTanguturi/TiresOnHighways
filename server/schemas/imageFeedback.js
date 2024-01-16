import { string } from "@tensorflow/tfjs-node";
import mongoose from "mongoose";

const imageFeedback = new mongoose.Schema(
    {
        imageName:String,
        accurate:Boolean,
        feedback:String
    }
)
const imageFeedbackSchema = mongoose.model("imageFeedback", imageFeedback)
export default imageFeedbackSchema;