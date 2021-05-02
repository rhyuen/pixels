import type { FunctionComponent } from "react";

interface Props {
    colours: Array<string>;
}

const Palette: FunctionComponent<Props> = ({ colours }: Props) => {
    return (
        <div className="row">
            {
                colours.map((col, colIndex) => {
                    return (
                        <div key={colIndex}
                            className="palette"
                            style={{ backgroundColor: col }}>
                        </div>
                    )
                })
            }
            <style jsx>{`
        .row{
            display: flex;
        }

        .palette{
            border: 2px solid transparent;
            width: 4rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
   
    `
            }</style>
        </div>
    );
};

export default Palette;


