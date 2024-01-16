import mongoose from "mongoose";

const webFeedback = new mongoose.Schema(
    {
        name:String,
        email:String,
        feedback:String
    }
)
const webFeedbackSchema = mongoose.model("webFeedback", webFeedback)
export default webFeedbackSchema;