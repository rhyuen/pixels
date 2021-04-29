import Layout from "../components/Layout";
import {getPixels} from "../services/pixels";
import Pixel from "../components/Pixel";
import {useEffect, useState} from "react";
import Palette from "../components/Palette";

export default function Timeline(){

    const [data, setData] = useState([]);


    useEffect(() => {
        let mounted = true;
       
        getPixels().then(res => {
            if(mounted){
                console.log(res.path);
                console.log(res.payload);
                setData(res.payload);
                return () => {
                    mounted = false;
                };
            }
        }).catch(e => {
            console.error(e);
            console.log("an error has occurred.")
        });                
    }, [])

    const getRelativeTimeString = (date) => {
        const differenceInSeconds = (new Date() - new Date(date))/1000;
        if(differenceInSeconds < 60){
            return `${Math.ceil(differenceInSeconds)} seconds ago.`;
        }
        const differenceInMinutes = differenceInSeconds / 60;
        if(differenceInMinutes < 60 ){
            return `${Math.ceil(differenceInMinutes)} minutes ago.`;
        }
        const differenceInHours = differenceInMinutes / 60;
        if(differenceInHours <= 24){
            return `${Math.ceil(differenceInHours)} hours ago.`;
        }
        
        return `${Math.ceil(differenceInHours / 24)} days ago.`;
        
    }

    return (
        <Layout>
            <h1>Pixel Timeline.</h1>
            {
                data.length === 0 ? "No pixels to show.":
                data.map(({image, creator, created_at, _id, palette}) => {                    
                    return (
                        <div style={{marginBottom: "20px"}} key={_id}>
                            <h3>{creator}, { getRelativeTimeString(created_at)}</h3>                    
                            <Pixel data={image} handleClick={ () => {console.log('dummy')}}/>
                            <br/>
                            <Palette colours={Object.values(palette)}/>
                        </div>
                    )
                })                
            }
        
        </Layout>
    )
}