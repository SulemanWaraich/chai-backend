import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ["M", "F"],
        },
        medical_record: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MedicalRecord",
        },
        DiagnosedWith: {
            type: String,
            required: true,
        },
        hospitalIn: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },
        bloodgroup: {
            type: String,
            required: true,
        },
        doctorVisit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
        },
    },
    {timestamps: true});

export const Patient = mongoose.model("Patient", patientSchema);