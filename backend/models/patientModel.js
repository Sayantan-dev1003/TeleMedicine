import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/TeleMedicine");

const patientSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    location: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.model("Patient", patientSchema);