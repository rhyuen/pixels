import mongoose from "mongoose";

const pixelSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    palette: Object,
    image: [
        [String]
    ]
}, {
    timestamps: {
        createdAt: "created_at"
    }
});

export default mongoose.models.Pixel || mongoose.model("Pixel", pixelSchema);