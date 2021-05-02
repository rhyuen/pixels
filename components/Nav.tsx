import Link from "next/link";
import type { FunctionComponent } from "react";

const Nav: FunctionComponent<{}> = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/timeline">Timeline</Link>
        </nav>
    )
}

export default Nav;