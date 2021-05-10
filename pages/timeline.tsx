import Layout from "../components/Layout";
import { getPixels } from "../services/pixels";
import Pixel from "../components/Pixel";
import { useEffect, useState } from "react";
import Palette from "../components/Palette";
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
            <h1>Pixel Timeline.</h1>
            {
                error ? <div>Something has gone wrong</div> : null
            }
            {
                data.length === 0 ? "No pixels to show." :
                    data.map(({ image, creator, created_at, _id, palette }) => {
                        return (
                            <div style={{ marginBottom: "20px" }} key={_id}>
                                <h3>{creator}, {getRelativeTimeString(created_at)}</h3>
                                <Pixel data={image} handleClick={() => { console.log('dummy') }} />
                                <br />
                                <Palette colours={Object.values(palette)} />
                            </div>
                        )
                    })
            }

        </Layout>
    )
}