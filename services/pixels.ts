import { Response } from "../shared/types";

export async function createPixel(image, palette): Promise<Response> {
    const url = "/api/make_pixel";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: image, palette: palette })
    };
    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Issue with createPixel");
        }
    });
}

export async function getPixels(): Promise<Response> {
    const url = "/api/get_pixels";
    return fetch(url).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Issue with getPixels");
        }
    });
}