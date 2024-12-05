import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined 
    className?: string | undefined
}

const Button = ({children, onClick, className}: Props) => {
  return (
    <button className={"m-5 flex justify-center " + className} onClick={onClick}>{children}</button>
  )
}

export default Button