import Nav from "./Nav";


export default function Layout({children}){
    return (
        <div>
            <Nav/>
            <main>
                {children}
            </main>
            <style jsx>{`
            
            `}
            </style>
        </div>
    )
}