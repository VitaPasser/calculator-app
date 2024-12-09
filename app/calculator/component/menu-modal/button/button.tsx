import React from 'react'

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    children: React.ReactNode
}

const Button = ({onClick, children}: Props) => {
  return (
      <button
          className="text-slate-600 dark:text-slate-500 font-medium px-6 py-2 text-2xl mr-1 mb-1"
          type="button"
          onClick={onClick}
      >
          {children}
      </button>
  )
}

export default Button