"use client"
import React, { useState } from 'react'
import Button from './component/button/button'

type Props = {}
type Expression = string[]


const Calculate = (expression: Expression) => {
    const operators = new Map([
        ['+', (x: number, y:number)=> x+y], 
        ['-', (x: number, y:number)=> x-y],
        ['*', (x: number, y:number)=> x*y],
        ['/', (x: number, y:number)=> x/y],
    ])
    const operatorsKeys = operators.keys().toArray().map((value)=> "\\"+value).join('')
    
    let result = 0
    const expression2 = expression[0] === '-' ? expression.join('') : ["+", ...expression].join('')
    const getNumbers = expression2.split(new RegExp('['+operatorsKeys+']', 'gui'))
                                  .filter((value)=> value !== "")
                                  .map((value) => parseFloat(value));
    const getOperators = expression2.split(new RegExp('[^'+operatorsKeys+']', 'gui'))
                                    .filter((value)=> value !== "");
    console.log(getNumbers)
    console.log(getOperators)
    
    result = getNumbers.reduce((prevValue, value, index)=>{
        const op = operators.get(getOperators[index])
        let result = 0;
        if (op !== undefined) result = op(prevValue, value)
        return result;
    }, 0)
    console.log(result)

    return result
}

const Calculator = (props: Props) => {
    const [expression, setExpression] = useState<Expression>([])
    const [result, setResult] = useState("")

    return (
        <div className="flex flex-col justify-center m-10">
            <h1>Calculator</h1>
            <div>{expression.join("") + result} :output</div>
            <div className="grid grid-cols-4">
                
                <Button onClick={() => {
                    setExpression([])
                    setResult("")
                }}>AC</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => prevExpression.filter((value, index)=> index != (prevExpression.length-1)))
                }}>del</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "%"])
                }}>%</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "/"])
                }}>/</Button>
                
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "1"])
                }}>1</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "2"])
                }}>2</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "3"])
                }}>3</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "*"])
                }}>*</Button>
                
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "4"])
                }}>4</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "5"])
                }}>5</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "6"])
                }}>6</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "-"])
                }}>-</Button>
                
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "7"])
                }}>7</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "8"])
                }}>8</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "9"])
                }}>9</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "+"])
                }}>+</Button>
                
                <Button onClick={() => {
                    setExpression(prevExpression => 
                        prevExpression.length === 0 || (prevExpression[0] !== '-') ? 
                        ['-', ...prevExpression] : 
                        prevExpression.filter((_, index) => index !== 0)
                    )
                }}>+/-</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "0"])
                }}>0</Button>
                <Button onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "."])
                }}>.</Button>
                <Button onClick={
                    () => setResult("=" + Calculate(expression))
                }>=</Button>
                
            </div>
        </div>
    )
}

export default Calculator