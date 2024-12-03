import React, { useState } from 'react'

type Props = {}

const array1DTo2D = (array: number[]): number[][] => {
    let result: number[][] = []
    let row: number[] = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(index % 3 == 0 && (index != 0)) {
            result.push(row)
            row = []
        } 
        row.push(element)
    }
    result.push(row);
    return result;
}

const Calculator = (props: Props) => {
    const numButtons = array1DTo2D([...Array(10).keys(), 0].filter((v, i)=> i !== 0 ));
    

    return (
        <div className="m-10">
            <h1>Calculator</h1>
            <div>output</div>
            <div className="flex flex-col flex-wrap">
                <div className="flex">
                    <button className="m-5">+</button>
                    <button className="m-5">-</button>
                    <button className="m-5">=</button>
                </div>
                { numButtons.map((num1, key1) => <div key={key1} className="flex">{num1.map((num2, key2) => (
                    <button className="m-5" key={key2}>{num2}</button>
                ))}</div>) }
            </div>
        </div>
    )
}

export default Calculator