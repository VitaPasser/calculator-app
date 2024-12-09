"use client"
import React, { useState } from 'react'
import Button from './component/button/button'
import { FaDeleteLeft } from "react-icons/fa6";
// import SwitcherTheme from './component/switcher-theme/switcher-theme';
import NumButton from './component/button/num-button/num-button';
// import { RiMenu2Line } from "react-icons/ri";

type Expression = string[]

const Calculate = (expression: Expression) => {
    const operators = new Map([
        ['*', (x: number, y: number) => x * y],
        ['/', (x: number, y: number) => x / y],
        ['+', (x: number, y: number) => x + y],
        ['-', (x: number, y: number) => x - y],
    ])
    const operatorsKeys = operators.keys()
        .toArray()
        .map((value) => "\\" + value)
        .join('')

    let result = 0
    const expression2 = expression[0] === '-'
        ? expression.join('')
        : ["+", ...expression].join('')
    const getNumbers = expression2.split(new RegExp('[' + operatorsKeys + '\(\)' + ']', 'gui'))
        .filter((value) => value !== "")
        .map((value) => parseFloat(value));
    const getOperators = expression2.split(new RegExp('[^' + operatorsKeys + ']', 'gui'))
        .filter((value) => value !== "");

    result = getNumbers.reduce((prevValue, value, index) => {
        const op = operators.get(getOperators[index])
        let result = 0;
        if (op !== undefined) result = op(prevValue, value)
        return result;
    }, 0)

    return result
}

const Calculator = () => {
    const [expression, setExpression] = useState<Expression>(["0"])
    const [history, setHistory] = useState<Expression[]>([])

    return (
        <div>
            <div className='flex flex-col justify-end items-end h-[14em]'>
                {history.filter((_, index) => history.length - 5 < index).map((value, key) =>
                    <div className="flex text-3xl font-normal" key={key}>{value}</div>)}
                <div className="text-7xl font-semibold text-black dark:text-neutral-50">{expression.join("")}</div>
            </div>
            <div className="mt-0 sm:mt-10 md:mt-20 grid grid-cols-4 gap-2">

                <NumButton className='dark:bg-sirocco' onClick={() => {
                    setExpression(["0"]); setHistory([])
                }}>AC</NumButton>
                <NumButton className='dark:bg-sirocco' onClick={() =>
                    expression.length === 1
                        ? setExpression(["0"])
                        : setExpression(prevExpression => prevExpression.filter((_, index) => index != (prevExpression.length - 1)))
                }><FaDeleteLeft /></NumButton>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() =>
                    setExpression(prevExpression => prevExpression[prevExpression.length - 1] === "%"
                        ? (parseFloat(prevExpression.filter((_, index) => prevExpression.length - 1 !== index).join("")) * 100 + "").split("")
                        : (parseFloat(prevExpression.join("")) / 100 + "%").split(""))
                }>%</Button>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() => {
                    setExpression(prevExpression => ['(', ...prevExpression, ')', "/"])
                }}>/</Button>

                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["1"])
                        : setExpression(prevExpression => [...prevExpression, "1"])
                }>1</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["2"])
                        : setExpression(prevExpression => [...prevExpression, "2"])
                }>2</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["3"])
                        : setExpression(prevExpression => [...prevExpression, "3"])
                }>3</NumButton>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() => {
                    setExpression(prevExpression => ['(', ...prevExpression, ')', "*"])
                }}>*</Button>

                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["4"])
                        : setExpression(prevExpression => [...prevExpression, "4"])
                }>4</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["5"])
                        : setExpression(prevExpression => [...prevExpression, "5"])
                }>5</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["6"])
                        : setExpression(prevExpression => [...prevExpression, "6"])
                }>6</NumButton>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "-"])
                }}>-</Button>

                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["7"])
                        : setExpression(prevExpression => [...prevExpression, "7"])
                }>7</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["8"])
                        : setExpression(prevExpression => [...prevExpression, "8"])
                }>8</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["9"])
                        : setExpression(prevExpression => [...prevExpression, "9"])
                }>9</NumButton>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "+"])
                }}>+</Button>

                <NumButton onClick={() => {
                    setExpression(prevExpression =>
                        prevExpression.length === 0 || (prevExpression[0] !== '-') ?
                            ['-', ...prevExpression] :
                            prevExpression.filter((_, index) => index !== 0)
                    )
                }}>+/-</NumButton>
                <NumButton onClick={() =>
                    expression.length === 1 && (expression[0] === "0")
                        ? setExpression(["0"])
                        : setExpression(prevExpression => [...prevExpression, "0"])
                }>0</NumButton>
                <NumButton className='dark:text-emerald-50' onClick={() => {
                    setExpression(prevExpression => [...prevExpression, "."])
                }}>.</NumButton>
                <Button className='text-emerald-600 dark:bg-neutral-50' onClick={() => {
                    setHistory(prevHistory => [...prevHistory, expression]);
                    setExpression(Calculate(expression).toString().split(""));
                }}>=</Button>

            </div>
        </div >
    )
}

export default Calculator