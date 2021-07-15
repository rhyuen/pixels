import type { FunctionComponent } from "react";

interface Props {
    colours: Array<string>;
}

const Palette: FunctionComponent<Props> = ({ colours }: Props) => {
    return (
        <ul className="row">
            {
                colours.map((col, colIndex) => {
                    return (
                        <li key={colIndex}
                            className="palette"
                            style={{ backgroundColor: col }}>
                        </li>
                    )
                })
            }
            <style jsx>{`
                .row{
                    display: flex;
                }

                .palette{
                    border: 2px solid transparent;
                    flex-grow: 1;
                    height: 1rem;
                    display: flex;                    
                    justify-content: center;
                    align-items: center;
                }
   
            `}</style>
        </ul>
    );
};

export default Palette;


