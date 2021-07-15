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
            <div className='card'>
                <h1>Colour some pixels and share it with the world.</h1>
                <section key={1} className='container--form'>
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

            <style jsx>{`
                              

                .container--form{
                    display: flex;
                    justify-content: flex-start;
                    flex-grow: 1;
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

                select{
                    display: flex;
                    flex-grow: 1;                    
                }                
                                

                form{
                    display: flex;
                    flex-grow: 1;
                }

                input[type="submit"]{
                    display: flex;
                    width: 100%;
                }
            `
            }</style>
        </Layout>
    )
}