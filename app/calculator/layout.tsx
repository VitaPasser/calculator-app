'use client'
import SwitcherTheme from "./component/switcher-theme/switcher-theme";
import Link from "next/link";
import MenuModal from "./component/menu-modal/menu-modal";
import { usePathname } from "next/navigation";

export default function CalculatorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    console.log(pathname)


    return (
        <div className='flex justify-center items-center h-screen text-slate-600 dark:text-slate-500 bg-white dark:bg-outer-space font-jost'>
            <div className="flex flex-col justify-center max-w-96">
                <div className='flex justify-between'>
                    <MenuModal />
                    <div className='flex'>
                        <Link href="/calculator" className={`rounded-full text-1xl font-medium p-1 smh:p-2 px-2 smh:px-4 smh:text-2xl ${pathname === '/calculator' ? "bg-emerald-600 dark:bg-neutral-50 text-neutral-50 dark:text-emerald-600 " : ''}`}>
                            Calculator
                        </Link>
                        <Link href="/calculator/converter" className={`rounded-full text-1xl font-medium p-1 smh:p-2 px-2 smh:px-4 smh:text-2xl ${pathname === '/calculator/converter' ? "bg-emerald-600 dark:bg-neutral-50 text-neutral-50 dark:text-emerald-600 " : ''}`}>
                            Converter
                        </Link>
                    </div>
                    <SwitcherTheme className='text-2xl smh:text-3xl' />
                </div>
                {children}
            </div>
        </div>
    );
}
