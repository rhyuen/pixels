import Nav from "./Nav";
import { FunctionComponent, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <div>
            <Nav />
            <main>
                {children}
            </main>
            <style jsx>{`
            
            `}
            </style>
        </div>
    )
};

export default Layout;