import Layout from "../components/Layout";
import { getPixels } from "../services/pixels";
import Pixel from "../components/Pixel";
import { useEffect, useState } from "react";
import Palette from "../components/Palette";
import Empty from "../components/Empty";
import { Pixel as PixelType } from "../shared/types"

export default function Timeline() {

    const [data, setData] = useState<Array<PixelType>>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;

        getPixels().then(res => {
            if (mounted) {
                console.log(res.path);
                console.log(res.payload);
                setData(res.payload);
            }
        }).catch(e => {
            console.error(e);
            console.log("an error has occurred.");
            if (mounted) {
                setError(true);
            }
        });

        return () => {
            mounted = false;
        };

    }, [])

    const getRelativeTimeString = (date: string) => {
        const differenceInSeconds: number = (new Date().valueOf() - new Date(date).valueOf()) / 1000;
        if (differenceInSeconds < 60) {
            return `${Math.ceil(differenceInSeconds)} seconds ago.`;
        }
        const differenceInMinutes = differenceInSeconds / 60;
        if (differenceInMinutes < 60) {
            return `${Math.ceil(differenceInMinutes)} minutes ago.`;
        }
        const differenceInHours = differenceInMinutes / 60;
        if (differenceInHours <= 24) {
            const minutesRemainder = differenceInMinutes % 60;
            return `${Math.floor(differenceInHours)} hours and ${Math.ceil(minutesRemainder)} minutes ago.`;
        }

        const days = differenceInHours / 24;
        return `${Math.ceil(days)} days and ${Math.ceil(days % 24)} hours ago.`;

    }

    return (
        <Layout>
            <div className='timeline'>
                <h1>The latest pixels in town.</h1>
                {
                    error ? <div>Something has gone wrong</div> : null
                }
                {
                    data.length === 0 ? <Empty>No pixels to show.</Empty> :
                        data.map(({ image, creator, created_at, _id, palette }) => {
                            return (
                                <div className='card' key={_id}>
                                    <h3>{creator}</h3>
                                    <p className="date-created">{getRelativeTimeString(created_at)}</p>
                                    <Pixel data={image} handleClick={() => { console.log('dummy') }} />
                                    <br />
                                    <Palette colours={Object.values(palette)} />
                                </div>
                            )
                        })
                }
            </div>
            <style jsx>{
                `
                    .timeline{                        
                        display: flex;
                        flex-direction: column;                        
                    }
                  
                    p.date-created{
                        font-size: .9rem;
                        font-weight: 600;
                        color: var(--GREY);
                        margin-bottom: 2rem;
                    }
                `
            }</style>
        </Layout>
    )
}