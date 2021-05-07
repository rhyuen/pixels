
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import handleDB from "./mw/db";
import Pixel from "./models/pixel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            return res.status(400).json({
                message: 'only GETs for this endpoint.'
            });
        } else {
            const result = await Pixel.find({}).exec();
            console.log(result);
            res.status(200).json({
                path: "[GET] /get_pixels",
                payload: result
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            path: "[GET] /get_pixels",
            message: "something has gone wrong on our end.",
            details: e
        });
    }
}

export default withApiAuthRequired(handleDB(handler));