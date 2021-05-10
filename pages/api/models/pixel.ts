import { model, Schema, Document, models, Model } from "mongoose";

interface IPixel extends Document {
    creator: string;
    palette: Object;
    image: Array<Array<string>>;
}

const pixelSchema: Schema = new Schema({
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


const Pixel: Model<IPixel> = models.Pixel || model("Pixel", pixelSchema);

export type { IPixel };

export default Pixel;