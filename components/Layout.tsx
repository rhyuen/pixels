import Nav from "./Nav";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";

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
            </main>
            <style jsx>{`
                main{
                    max-width: 1000px;
                    margin: 0 auto;
                }
            `}
            </style>
        </div>
    )
};

export default Layout;