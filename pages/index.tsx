import { useUser } from "@auth0/nextjs-auth0";
import Home from "../components/Home";
import Landing from "../components/Landing";

export default function Index() {
    const { user, isLoading, error } = useUser();

    if (isLoading) {
        return <h1>loading</h1>
    }

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (user) {
        return <Home />
    } else {
        return <Landing />
    }

}