import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined 
}

const Button = ({children, onClick}: Props) => {
  return (
    <button className="m-5" onClick={onClick}>{children}</button>
  )
}

export default Button