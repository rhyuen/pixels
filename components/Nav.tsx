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
            <ul className="container">
                <li className='container__item'>
                    <Link href="/">
                        <a>pixi</a>
                    </Link>
                </li>
                <li className='container__item'>
                    <Link href="/timeline">
                        <a>Timeline</a>
                    </Link>
                </li>
            </ul>
            <ul className='container container--right-aligned'>
                {/* <li className='container__item'>
                    <Link href="/profile">
                        <a>{user.name}</a>
                    </Link>
                </li> */}
                <li className='container__item'>
                    <a href="/api/auth/logout">Logout</a>
                </li>
            </ul>
            <style jsx>{`
                nav{
                    max-width: 1000px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    height: 5rem;                    
                    margin-bottom: 2rem;
                }

                .container{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 100%;
                }
                .container__item{
                    margin: 0 1rem;
                }

                .container--right-aligned{
                    justify-content: flex-end;
                }

                a{
                    position: relative;
                    
                }
                a:after{
                    content: '';
                    display: block;
                    position: absolute;
                    height: 5px;                    
                    background-color: var(--GREY);
                    width: 100%;
                    opacity: 0;
                    transform-origin: center;
                    transition: opacity 0.2s ease-in-out, transform .2s ease-in-out;
                    transform: scale(0);
                }

                a:hover::after{
                    opacity: 1;
                    transform: scale(1);
                }
            `}</style>
        </nav>
    )
}

export default Nav;