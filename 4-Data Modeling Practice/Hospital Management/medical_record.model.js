import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjecId,
            required: true
        },
        medicalHistory: {
            type: String,
            required: true,
        },
    },
    {timestamps: true});

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);