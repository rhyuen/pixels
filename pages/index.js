import {useState, useEffect} from "react";
import Layout from "../components/Layout";

export default function Index(){
   

    const [COLUMNS, setCOLUMNS] = useState(4);    
    const [colour, setColour] = useState("white");
    const [data, setData] = useState(new Array(COLUMNS).fill(new Array(COLUMNS).fill("palevioletred")));

    const handleColumnChange = e => {
        const {value} = e.target;        
        setCOLUMNS(parseInt(value));
    }

    const handleReset = e => {
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill("white")))
    }

    useEffect(() => {
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill("palevioletred")));
    }, [COLUMNS]);


    const handleClick = (clickedRow, clickedCol) => {
        console.log(clickedRow);
        console.log(clickedCol);
        
        const updated = data.map((currentRow, row_index) => {    
            if(row_index === clickedRow){
                return currentRow.map((currentCol, col_index) => {
                    if(col_index === clickedCol){                        
                        return colour;
                    }else{
                        return currentCol;
                    }                        
                })
            }else{
                return currentRow;
            }
        })             
        setData(updated);
    }

    return (
        <Layout>
            <h1>Pixels</h1>
                <section>
                    <select value={COLUMNS} onChange={handleColumnChange}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <button onClick={handleReset}>Reset</button>
            </section>
            <section>
                {
                    data.map((row, rowIndex) => {
                        return (
                            <div className="row" 
                                index={rowIndex}>
                                {
                                    row.map((col, colIndex) => {
                                        return (
                                            <div key={colIndex} 
                                                className="square" 
                                                style={{backgroundColor: col}} 
                                                onClick = {() => handleClick(rowIndex, colIndex)}>                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </section>
            <section>
                <div className="row">
                    <div className="square" 
                        style={{backgroundColor: "black"}} 
                        onClick = {()=> setColour("black")}>
                        black
                    </div>
                    <div className="square" 
                        style={{backgroundColor: "white"}} 
                        onClick = {()=> setColour("white")}>
                        white
                    </div>
                    <div className="square" 
                        style={{backgroundColor: "#3434ff"}} 
                        onClick = {()=> setColour("#3434ff")}>
                        white
                    </div>  
                    <div className="square" 
                        style={{backgroundColor: "#afafaf"}} 
                        onClick = {()=> setColour("#afafaf")}>
                        white
                    </div>
                </div>
            </section>

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
        </Layout>
    )
}