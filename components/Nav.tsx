import Link from "next/link";
import type { FunctionComponent } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const Nav: FunctionComponent<{}> = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/profile">Profile</Link>
            <div>
                Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
            </div>
        </nav>
    )
}

export default Nav;