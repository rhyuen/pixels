import { FunctionComponent } from "react";


const Landing: FunctionComponent<{}> = () => {
    return (
        <main>
            <section>
                <h1>pixi, make and share pixel art in seconds!</h1><br />
                <div className='button-container'>
                    <a href="/api/auth/login" className='link-button link-button--primary'>Signup</a>
                    <a href="/api/auth/login" className='link-button link-button--secondary'>Login</a>
                </div>
            </section>
            <style jsx>
                {`
                    h1{
                        font-size: 3rem;
                    }
                    main{
                        max-width: 1000px;
                        height: 100vh;
                        margin: 0 auto;
                        display: flex;
                        justify-content: center;
                        flex-direction: column:
                        align-items: center;

                    }

                    section{           
                        display: flex;                        
                        flex-direction: column;
                        justify-content: center;                        
                    }

                    .button-container{
                        display: flex;
                    }
                   

                    .link-button{
                        display: flex;
                        justify-content: center;
                        align-items: center;                        
                        flex-grow: 1;
                        font-size: 1.5rem;
                        border-radius: .5rem;
                        padding: .5rem 2rem;                                                
                        margin: 1rem;
                        transition: background .2s ease-in-out, color .2s ease-in-out;
                    }

                    .link-button--primary{
                        background: black;
                        color: white;
                        border: 2px solid black;
                    }

                    .link-button--primary:hover{
                        background: white;
                        color: black;
                    }

                    .link-button--secondary{
                        background: white;
                        color: grey;
                        border: 2px solid var(--GREY);
                    }
                    .link-button--secondary:hover{
                        border-color: black;
                        color: black;
                        background: var(--GREY);
                    }
                   

                `}
            </style>
        </main>
    )
}

export default Landing;