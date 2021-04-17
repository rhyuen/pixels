import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/timeline">Timeline</Link>
        </nav>
    )
}

export default Nav;