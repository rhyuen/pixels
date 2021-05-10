import { FunctionComponent } from "react";


const Landing: FunctionComponent<{}> = () => {
    return (
        <div>
            <h1>Pixels, make and share pixels.</h1><br />
            <a href="/api/auth/login">Login</a>
        </div>
    )
}

export default Landing;