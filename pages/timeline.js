import Layout from "../components/Layout";
import {useEffect, useState} from "react";

export default function Timeline(){

    const [data, setData] = useState([]);


    useEffect(() => {
        let mounted = true;
        const url = "/api/get_pixels";
        fetch(url).then(res => res.json())
            .then(res => {
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

    return (
        <Layout>
            <h1>Pixel Timeline.</h1>
            {
                data.length === 0 ? "No pixels to show.":
                data.map(px => {                    
                    return (
                        <div style={{marginBottom: "20px"}}>
                        {
                            px.image.map((row) => {
                                return (                            
                                    <div className="row">
                                        {
                                            row.map(col => {
                                                return (
                                                    <div className="square" style={{backgroundColor: col}}></div>
                                                )
                                            })
                                        }
                                    </div>                            
                                )
                            })
                        }
                        </div>
                    )
                })                
            }

            <style jsx>{`
                .row{
                    display: flex;
                }

                .square{
                    border: 2px solid black;
                    width: 4rem;
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .square:first-child{
                    border-right: 2px solid transparent;
                }
                .square:last-child{                    
                    border-left: 2px solid transparent;
                    border-right: 2px solid black;
                }
            `}</style>
        </Layout>
    )
}