import React from 'react'
import Button from '../button'

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    className?: string | undefined
    children: React.ReactNode
}

const NumButton = ({ onClick, className, children }: Props) => {
    const _className = className === undefined ? "" : className
    return (
        <Button
            className={'dark:text-slate-300' + ' ' + _className}
            onClick={onClick}>
            {children}
        </Button>
    )
}

export default NumButton