import React from 'react'
import { FaRegMoon } from 'react-icons/fa6'
import { IoSunnyOutline } from "react-icons/io5";

type Props = {
    className?: string | undefined
}

const SwitcherTheme = ({ className }: Props) => {
    const [isDark, setIsDark] = React.useState(false)
    const classname_ = className === undefined ? "" : className

    const darkModeHandler = () => {
        setIsDark(!isDark);
        document.body.classList.toggle("dark");
    }

    return (
        <button className='text-2xl' onClick={darkModeHandler}>
            {
                isDark ? <IoSunnyOutline className={'text-neutral-50' + ' ' + classname_} /> : <FaRegMoon className={' ' + classname_} />
            }
        </button>
    )
}

export default SwitcherTheme