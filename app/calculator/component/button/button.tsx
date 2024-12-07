import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  className?: string | undefined
}

const Button = ({ children, onClick, className }: Props) => {
  const _className = className === undefined ? "" : className
  return (
    <div className='flex justify-center'>
      <button className={"flex justify-center items-center aspect-square w-[3em] text-3xl  rounded-full" + " " + _className} onClick={onClick}>{children}</button>
    </div>
  )
}

export default Button