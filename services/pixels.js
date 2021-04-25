export function createPixel(data){
    const url = "/api/make_pixel";    

    const options = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({data: data})
    };
    return fetch(url, options).then(res => res.json());
}

export function getPixels(){
    const url = "/api/get_pixels";
    return fetch(url).then(res => res.json());
}