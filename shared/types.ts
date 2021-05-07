export interface Pixel {
    creator: string;
    palette: Array<string>;
    image: Array<Array<string>>;
    created_at: string;
    updatedat: string;
    _id: string;
}

export interface Response {
    path: string;
    payload: Array<Pixel>;
}


export interface UserDetails {
    email: string;
    email_verified: boolean;
    name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: string;
}