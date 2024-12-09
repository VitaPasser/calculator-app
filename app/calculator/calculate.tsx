export type Expression = string[]

export const Calculate = (expression: Expression) => {
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