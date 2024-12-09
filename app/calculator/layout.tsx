'use client'
import { RiMenu2Line } from "react-icons/ri";
import SwitcherTheme from "./component/switcher-theme/switcher-theme";

export default function CalculatorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex justify-center items-center h-screen text-slate-600 dark:text-slate-500 bg-white dark:bg-outer-space font-jost'>
            <div className="flex flex-col justify-center max-w-96">
                <div className='flex justify-between'>
                    <button><RiMenu2Line className='text-3xl font-normal content-center' /></button>
                    <div className='flex'>
                        <button className='rounded-full text-2xl font-medium bg-emerald-600 dark:bg-neutral-50 p-2 px-4 text-neutral-50 dark:text-emerald-600'>Calculator</button>
                        <button className='rounded-full text-2xl font-medium p-2 px-4'>Converter</button>
                    </div>
                    <SwitcherTheme className='text-3xl' />
                </div>
            {children}
            </div>
        </div>
    );
}
