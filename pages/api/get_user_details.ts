import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, handleProfile } from "@auth0/nextjs-auth0";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await handleProfile(req, res, {});
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            path: "[GET] /get_user_details",
            message: "something has gone wrong on our end.",
            details: e
        });
    }
}

export default withApiAuthRequired(handler);