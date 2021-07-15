import { FunctionComponent } from "react";

interface Props {
    data: Array<Array<string>>;
    handleClick: (rowIndex: number, colIndex: number) => void;
};

const Pixel: FunctionComponent<Props> = ({ data, handleClick }: Props) => {
    return (
        <>
            {
                data.map((row, rowIndex) => {
                    return (
                        <ul className="row"
                            key={rowIndex}>
                            {
                                row.map((col, colIndex) => {
                                    return (
                                        <li key={colIndex}
                                            className="square"
                                            style={{ backgroundColor: col }}
                                            onClick={() => handleClick(rowIndex, colIndex)}>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    );
                })
            }
            <style jsx>{`

                @keyframes jiggle {
                    0%{
                        transform: rotate(0deg);
                    }

                    25%{
                        transform: rotate(-15deg);
                    }
                    50%{
                        transform: rotate(0deg);
                    }

                    75%{
                        transform: rotate(15deg);
                    }

                    100%{
                        transform: rotate(0deg);
                    }

                }

                .row{
                    display: flex;
                }
                .row:first-child{
                    margin-top: 2rem;
                }
                .row:last-child{
                    margin-bottom: 2rem;
                }

                .square{
                    border: 2px solid transparent;
                    margin-right: 2px;
                    margin-bottom: 2px;
                    width: 4rem;
                    height: 4rem;                    
                }    
                .square:hover{
                    animation: jiggle .4s;
                }    
                                
            `
            }</style>
        </>
    );
};


export default Pixel;