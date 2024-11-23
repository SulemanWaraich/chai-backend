import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        Specialized: {
            type: String,
            required: true,
        },
        AdressLine: {
            type: String,
            required: true,
        },
        PinCode: {
            type: String,
            required: true,
        },
    },
    {timestamps: true});

export const Hospital = mongoose.model("Hospital", hospitalSchema);