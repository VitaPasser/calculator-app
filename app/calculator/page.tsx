"use client"
import React, { useEffect, useState } from 'react'
import Button from './component/button/button'
import { FaDeleteLeft } from "react-icons/fa6";
import NumButton from './component/button/num-button/num-button';

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

    const addedNumber = (number: string) => {
        return expression.length === 1 && (expression[0] === "0")
            ? setExpression([number])
            : setExpression(prevExpression => [...prevExpression, number])
    }

    const addedPlus = () => setExpression(prevExpression => [...prevExpression, "+"])

    const addedMinus = () => {
        setExpression(prevExpression => [...prevExpression, "-"])
    }

    const addedMultiply = () => {
        setExpression(prevExpression => ['(', ...prevExpression, ')', "*"])
    }

    const addedDivision = () => {
        setExpression(prevExpression => ['(', ...prevExpression, ')', "/"])
    }

    const addedDot = () => {
        setExpression(prevExpression => [...prevExpression, "."])
    }

    const addedResult = () => {
        setHistory(prevHistory => [...prevHistory, expression]);
        setExpression(Calculate(expression).toString().split(""));
    }

    const addedDelete = () =>
        expression.length === 1
            ? setExpression(["0"])
            : setExpression(prevExpression => prevExpression.filter((_, index) => index != (prevExpression.length - 1)))

    const addedPercent = () =>
        setExpression(prevExpression => prevExpression[prevExpression.length - 1] === "%"
            ? (parseFloat(prevExpression.filter((_, index) => prevExpression.length - 1 !== index).join("")) * 100 + "").split("")
            : (parseFloat(prevExpression.join("")) / 100 + "%").split(""))

    useEffect(() => {
        const keyDownHandler = (e: globalThis.KeyboardEvent, key: string) => {
            if (e.key === key) {
                e.preventDefault();
                addedNumber(key);
            }
        }

        const keyDownHandlers = [
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "0"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "1"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "2"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "3"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "4"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "5"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "6"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "7"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "8"),
            (e: globalThis.KeyboardEvent) => keyDownHandler(e, "9"),
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "+") {
                    e.preventDefault();
                    addedPlus();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "-") {
                    e.preventDefault();
                    addedMinus();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "*") {
                    e.preventDefault();
                    addedMultiply();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "/") {
                    e.preventDefault();
                    addedDivision();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "%") {
                    e.preventDefault();
                    addedPercent();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === ".") {
                    e.preventDefault();
                    addedDot();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addedResult();
                }
            },
            (e: globalThis.KeyboardEvent) => {
                if (e.key === "Backspace" ||
                    e.key === "Delete"
                ) {
                    e.preventDefault();
                    addedDelete();
                }
            },
        ]

        keyDownHandlers.forEach(callbackfn => {
            document.addEventListener("keydown", callbackfn);
        })

        return () => {
            keyDownHandlers.forEach(callbackfn => {
                document.removeEventListener("keydown", callbackfn);
            })
        };
    });

    return (
        <div>
            <div className='flex flex-col justify-end items-end h-[14em]'>
                {history.filter((_, index) => history.length - 5 < index).map((value, key) =>
                    <div className="flex text-3xl font-normal" key={key}>{value}</div>)}
                <div className="text-7xl font-semibold text-black dark:text-neutral-50">{expression.join("")}</div>
            </div>
            <div className="mt-0 sm:mt-10 md:mt-20 grid grid-cols-4 gap-2">

                <NumButton
                    className='dark:bg-sirocco'
                    onClick={() => {
                        setExpression(["0"]);
                        setHistory([])
                    }}
                >AC</NumButton>
                <NumButton
                    className='dark:bg-sirocco'
                    onClick={addedDelete}
                ><FaDeleteLeft /></NumButton>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedPercent}
                >%</Button>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedDivision}
                >/</Button>

                <NumButton onClick={() => addedNumber("1")}>1</NumButton>
                <NumButton onClick={() => addedNumber("2")}>2</NumButton>
                <NumButton onClick={() => addedNumber("3")}>3</NumButton>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedMinus}
                >*</Button>

                <NumButton onClick={() => addedNumber("4")}>4</NumButton>
                <NumButton onClick={() => addedNumber("5")}>5</NumButton>
                <NumButton onClick={() => addedNumber("6")}>6</NumButton>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedMinus}
                >-</Button>

                <NumButton onClick={() => addedNumber("7")}>7</NumButton>
                <NumButton onClick={() => addedNumber("8")}>8</NumButton>
                <NumButton onClick={() => addedNumber("9")}>9</NumButton>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedPlus}
                >+</Button>

                <NumButton onClick={() => {
                    setExpression(prevExpression =>
                        prevExpression.length === 0 || (prevExpression[0] !== '-') ?
                            ['-', ...prevExpression] :
                            prevExpression.filter((_, index) => index !== 0)
                    )
                }}>+/-</NumButton>
                <NumButton onClick={() => addedNumber("0")}>0</NumButton>
                <NumButton
                    className='dark:text-emerald-50'
                    onClick={addedDot}
                >.</NumButton>
                <Button
                    className='text-emerald-600 dark:bg-neutral-50'
                    onClick={addedResult}
                >=</Button>

            </div>
        </div >
    )
}

export default Calculator