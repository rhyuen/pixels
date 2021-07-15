import Nav from "./Nav";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";
import styles from '../styles/global.module.css';

interface Props {
    children: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="./favicon.png" />
                <meta
                    name="description"
                    content="application for making quick pixel images" />
                <title>Pixel</title>
            </Head>
            <Nav />
            <main>
                {children}
                <aside>
                    <h2>Things other people are doing.</h2>
                    <p>
                        At this time, nothing!
                    </p>
                </aside>
            </main>

            <footer>
                Made by Robert
            </footer>
            <style jsx>{`
                main{
                    max-width: 1000px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr;
                }

                aside{
                    display: none;
                    grid-column: 2/span 1;                    
                    flex-direction: column;                        
                    margin-left: 4rem;
                }

                @media screen and (min-width: 700px) and (max-width: 999px){
                    main{                        
                        grid-template-columns: 1fr .6fr;
                    }
    
                    aside{                        
                        display: flex;                        
                    }
                }

                @media screen and (min-width: 1000px) {
                    main{                        
                        grid-template-columns: 2fr 1fr;
                    }
    
                    aside{                        
                        display: flex;                        
                    }
                }


             

                footer{
                    max-width: 1000px;
                    min-height: 10rem;
                    margin: 0 auto;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 1rem;
                }
            `}
            </style>
        </div>
    )
};

export default Layout;