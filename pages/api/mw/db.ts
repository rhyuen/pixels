import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";


const handleDB = fn => async (req: NextApiRequest, res: NextApiResponse) => {
    const ID = Math.floor(Math.random() * 1000);
    const { db } = process.env;
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await fn(req, res);
    console.log(`[${ID}] db work done, getting ready to d/c.`);
    await mongoose.disconnect()
        .then(() => console.log(`[${ID}] mongoose connection closed.`))
        .catch(e => { console.log("issue with closing mongoose.") });
}

export default handleDB;