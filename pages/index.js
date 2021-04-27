import {useState, useEffect} from "react";
import Layout from "../components/Layout";
import { createPixel } from "../services/pixels";

export default function Index(){
    const lists = [
        {
            first: "#272324", 
            second: "#83B799", 
            third: "#E2CD6D", 
            fourth: "#C2B29F", 
            fifth: "#E4D8B4", 
            sixth: "#E86f68"
         },
         {
            "first": "#ffce3f",
            "second": "#06304b",
            "third": "#0094b6"
        },
        {
            "first": "#e8d3a3",
            "second": "#ffa633",
            "third": "#3b5a9d",
            "fourth": "#4fb2aa"
        },
        {
            "first": "#594f4f",
            "second": "#54798d",
            "third": "#45adab",
            "fourth": "#9de0ad",
            "fifth": "#e5fcc2"
        },        
        {
            "first": "#a8e6ce",
            "second": "#dcedc2",
            "third": "#ffd395",
            "fourth": "#ffaaa6",
            "fifth": "#ff8c94"
        },
        {
            "first": "#99b898",
            "second": "#feceab",
            "third": "#ff847c",
            "fourth": "#e84a5f",
            "fifth": "#2a363b"
        },
        {
            "first": "#f8b195",
            "second": "#f67280",
            "third": "#c06c84",
            "fourth": "#6c5b7b",
            "fifth": "#355c7d"
        },
        {
            "first": "#581845",
            "second": "#900c3f",
            "third": "#c70039",
            "fourth": "#ff5733",
            "fifth": "#ffc300"
        },
        {
            "first": "#aa4516",
            "second": "#e06c36",
            "third": "#f29d4b",
            "fourth": "#162828",
            "fifth": "#334542",
            "six": "#51615e"
        }
    ];

    const [count, setCount] = useState(0);
    const [palette, setPalette] = useState(lists[count]);

    const [COLUMNS, setCOLUMNS] = useState(4);    
    const [colour, setColour] = useState(Object.keys(palette)[1]);
    const [data, setData] = useState(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));

    const handleColumnChange = e => {
        const {value} = e.target;        
        setCOLUMNS(parseInt(value));
    }

    const handleReset = e => {
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])))
        setColour(palette[Object.keys(palette)[1]]);
    }

    useEffect(() => {
        setColour(palette[Object.keys(palette)[1]]);
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
    }, [COLUMNS]);

    useEffect(() => {        
        setPalette(lists[count]);        
    }, [count])
    useEffect(() => {
        setColour(palette[Object.keys(palette)[1]]);
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
    }, [palette])
  
    
    const handleColourChange = () => {
        setCount( count === lists.length -1 ? 0 : count + 1);   
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])))
        setColour(palette[Object.keys(palette)[1]]);     
    }


    const handleClick = (clickedRow, clickedCol) => {        
        
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

    const handleSubmit = e => {
        e.preventDefault();
        createPixel(data)            
            .then(res => {
                console.log(res.path);
                console.log(res.description);
                setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
            }).catch(err => {
                console.log(err);
                console.log("error with form submission");
            });
    }

    return (
        <Layout>
            <h1>Pixels</h1>
            <section key={1}>
                    <select value={COLUMNS} onChange={handleColumnChange}>
                    {
                        [2, 3, 4, 5, 6, 7, 8].map((num, index) => {
                            return (
                                <option value={num} key={index}>{num}</option>
                            )
                        })
                    }                  
                </select>
                <button onClick={handleReset}>Reset</button>
            </section>
            <section key={2}>
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
            <section key={3}>
                {
                    <div className="row">
                        {
                            Object.keys(palette).map((p, pIndex) => {
                                return (
                                    <div className="square" 
                                        key={pIndex}
                                        style={{backgroundColor: palette[p]}} 
                                        onClick = {() => setColour(palette[p])}>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                
              
            </section>
            <section key={4} style={{display: "flex"}}>
                <form onSubmit={handleSubmit}>
                    <input type="submit"/>
                </form>
                <div>
                    <button onClick={handleColourChange}>
                        New Colours
                    </button>
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