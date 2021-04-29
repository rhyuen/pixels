import handleDB from "./mw/db";
import Pixel from "./models/pixel";

async function handler(req, res) {
    try{
        if(req.method !== 'POST'){
            return res.status(400).json({
                message: "only posts are allowed"
            })
        }else{

            const {image, palette} = req.body;
            const toBeSaved = image.map(item=>item);
            console.log(toBeSaved);
            console.log( palette);            
            const latest = new Pixel({
                creator: `Robert${new Date().getMilliseconds()}`,
                image: toBeSaved,
                palette: palette
                
            });

            await latest.save();
            console.log('yes');

            return res.status(200).json({
                path: "[POST] /make_pixel",
                description: "pixel creation success"
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            path: "[POST] /make_pixels",            
            message: "something has gone wrong on our end.",
            details: e
        });
    }
}

export default handleDB(handler);