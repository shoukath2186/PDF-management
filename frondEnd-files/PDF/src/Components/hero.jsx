import React from 'react';
import { useSelector } from 'react-redux';
import InputPdf from '../Pages/inputPdf';

const Hero = () => {
  const dark = useSelector((state) => state.app.dark);

  return (
    <div className={` mx-auto px-4 ${dark ? 'bg-gray-900' : 'bg-gray-50'} h-full w-full `}>
      
    <div className="flex flex-col items-center justify-center h-[450px] pt-[60px] text-center space-y-6 ">
        <h1 className={`text-4xl sm:text-5xl font-bold ${dark ? 'text-blue-400' : 'text-blue-900'}`}>
            Simplify PDF Management
        </h1>
        <p className={`text-lg sm:text-xl ${dark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
            Our PDF Selector tool makes it easy to upload, organize, and access your important documents. Simply drag and drop your PDFs, and we'll handle the rest.
        </p>
        <p className={`text-md sm:text-lg ${dark ? 'text-gray-400' : 'text-gray-700'} max-w-lg`}>
            No complicated setups or additional software required - just a clean, user-friendly interface to manage your PDFs.
        </p>    
    </div>
    <InputPdf />
     <div className='h-[230px]'></div>
</div>
  );
};

export default Hero;