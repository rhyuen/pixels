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
                        <div className="row"
                            key={rowIndex}>
                            {
                                row.map((col, colIndex) => {
                                    return (
                                        <div key={colIndex}
                                            className="square"
                                            style={{ backgroundColor: col }}
                                            onClick={() => handleClick(rowIndex, colIndex)}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    );
                })
            }
            <style jsx>{`
                .row{
                    display: flex;
                }

                .square{
                    border: 2px solid black;
                    width: 4rem;
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .square:first-child{
                    border-right: 2px solid transparent;
                }
                .square:last-child{                    
                    border-left: 2px solid transparent;
                    border-right: 2px solid black;
                }
            `
            }</style>
        </>
    );
};


export default Pixel;