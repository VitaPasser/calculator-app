import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Converter",
  description: "Simple converter app",
};

const Converter = () => {
  return (
    <div className='text-2xl flex justify-center h-[50svh] mt-40 smh:mt-80 w-80 smh:w-96'>
      Converter
    </div>
  )
}

export default Converter