import mongoose from "mongoose";

const hoursInHospitals = new mongoose.Schema(
    {
        hospitalId: {
            type: String,
            required: true,
        },
        hours: {
            type: Number,
            required: true,
        },
    }
)

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true
        },
        Experience: {
            type: Number,
            default: 0,
        },
        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },
        hoursInHospitals: {
            type: [hoursInHospitals],
        },
    }, 
    {timestamps: true});

export const Doctor = mongoose.model("Doctor", doctorSchema);