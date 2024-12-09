import React from 'react'
import { RiMenu2Line } from 'react-icons/ri';
import Button from './button/button';


const MenuModal = () => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className='text-2xl smh:text-3xl font-normal content-center'
                type="button"
                onClick={() => setShowModal(true)}
            >
                <RiMenu2Line />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-outer-space outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-end p-6 rounded-b">
                                    <Button
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={() => setShowModal(false)}
                                    >
                                        Under construction
                                    </Button>
                                    <Button
                                        onClick={() => setShowModal(false)}
                                    >
                                        Under construction
                                    </Button>
                                    <Button
                                        onClick={() => setShowModal(false)}
                                    >
                                        Under construction
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );


}

export default MenuModal