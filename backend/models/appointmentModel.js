import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/TeleMedicine");

const appointmentSchema = mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Completed", "Canceled"], 
        default: "Pending"
    },
    reason: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
