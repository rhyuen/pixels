const mongoose = require("mongoose");

const pixelSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    palette: Object,
    image: [
        [String]
    ] 
},{
    timestamps: {
        createdAt: "created_at"
    }
});

module.exports  = mongoose.models.Pixel || mongoose.model("Pixel", pixelSchema);