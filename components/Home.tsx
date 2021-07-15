import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import Layout from "../components/Layout";
import { createPixel } from "../services/pixels";
import lists from "../components/colours";
import Pixel from "../components/Pixel";

export default function Home() {

    const [count, setCount] = useState<number>(0);
    const [palette, setPalette] = useState<object>(lists[count]);

    const [COLUMNS, setCOLUMNS] = useState<number>(4);
    const [colour, setColour] = useState<string>(Object.keys(palette)[1]);
    const [data, setData] = useState<Array<Array<string>>>(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));

    const handleColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setCOLUMNS(parseInt(value));
    };

    const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])))
        setColour(palette[Object.keys(palette)[1]]);
    };

    useEffect(() => {
        setColour(palette[Object.keys(palette)[1]]);
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
    }, [COLUMNS]);

    useEffect(() => {
        setPalette(lists[count]);
    }, [count]);
    useEffect(() => {
        setColour(palette[Object.keys(palette)[1]]);
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
    }, [palette]);


    const handleColourChange = () => {
        setCount(count === lists.length - 1 ? 0 : count + 1);
        setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])))
        setColour(palette[Object.keys(palette)[1]]);
    };


    const handleClick = (clickedRow: number, clickedCol: number) => {

        const updated = data.map((currentRow, row_index) => {
            if (row_index === clickedRow) {
                return currentRow.map((currentCol, col_index) => {
                    if (col_index === clickedCol) {
                        return colour;
                    } else {
                        return currentCol;
                    }
                })
            } else {
                return currentRow;
            }
        })
        setData(updated);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mounted = true;
        createPixel(data, palette)
            .then(res => {
                if (mounted) {
                    console.log(res.path);
                    console.log(res.payload);
                    setData(new Array(COLUMNS).fill(new Array(COLUMNS).fill(palette[Object.keys(palette)[0]])));
                }
            }).catch(err => {
                console.log(err);
                console.log("error with form submission");
            });
        return () => {
            mounted = false;
        }
    }

    return (
        <Layout>
            <div className='creator'>
                <h1>Make a px and share it with the world.</h1>
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
                    <button className="button button--secondary" onClick={handleReset}>Reset</button>
                </section>
                <section key={2}>
                    <Pixel data={data} handleClick={handleClick} />
                </section>
                <section key={3}>

                    <ul className="row">
                        {
                            Object.keys(palette).map((p, pIndex) => {
                                return (
                                    <li className="square"
                                        key={pIndex}
                                        style={{ backgroundColor: palette[p] }}
                                        onClick={() => setColour(palette[p])}>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
                <section key={4} className='container--form'>
                    <form onSubmit={handleSubmit}>
                        <input className="button" type="submit" />
                    </form>
                    <button className="button button--secondary" onClick={handleColourChange}>
                        New Colours
                    </button>
                </section>
            </div>
            <aside>
                <h2>Things other people are doing.</h2>
                <p>
                    At this time, nothing!
                </p>
            </aside>

            <style jsx>{`
                .creator{
                    display: flex;
                    flex-direction: column;
                    grid-column: 1/span 1;
                    padding: 2rem;
                    margin-right: 5rem;
                    border: 1px solid rgba(0,0,0,0.1);
                    border-radius: .5rem;
                }
                aside{
                    display: flex;
                    flex-direction: column;                    
                }

                .container--form{
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 1rem;
                }

                .row{
                    display: flex;
                }

                .square{                   
                    width: 4rem;
                    height: 4rem;
                    display: flex;
                    flex-grow: 1;
                }
                
                .button{
                    color: white;
                    font-weight: 600;
                    padding: .5rem 1rem;                    
                    background: black;
                    font-size: 1.2rem;
                    border: 2px solid black;
                    margin: 0 1rem;
                    transition: background .2s ease-in-out, color .2s ease-in-out;
                }
                .button:first-child{
                    margin-left: 0;
                }
                .button:last-child{
                    margin-right: 0;
                }
                .button:hover{
                    color: black;
                    background: white;
                }

                .button--secondary{
                    color: var(--GREY);
                    background: white;
                    border: 2px solid var(--GREY);
                }
                .button--secondary:hover{
                    background: rgba(0,0,0,0.1);
                }
            `
            }</style>
        </Layout>
    )
}