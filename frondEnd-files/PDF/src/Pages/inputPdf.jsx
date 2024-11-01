import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Upload, X } from 'lucide-react';
import DisplayPDF from '../Components/displayPDF';

function InputPdf() {
  const dark = useSelector((state) => state.app.dark);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      setSelectedFile(null);
    } else {
      setErrorMessage('');
      setSelectedFile((file));
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setErrorMessage('');
  };

  return (
    <div  className='w-full '>
      <div className=" flex justify-center">
        <label
          htmlFor="file-input"
          className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors duration-150 ${
            dark
              ? 'bg-blue-800 hover:bg-blue-900 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {selectedFile ? (
            <>
              <span>{selectedFile.name}</span>
              <button
                type="button"
                className="ml-4 p-1 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleFileRemove}
              >
                <X size={16} className="text-white" />
              </button>
            </>
          ) : (
            <>
              <Upload size={18} className="mr-2" />
              <span>Select PDF</span>
            </>
          )}
        </label>
        <input
          id="file-input"
          type="file"
         // accept=".pdf"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>
      {errorMessage && (
        <div
          className="mt-6 p-2 text-sm text-center text-red-600 border border-red-600 rounded-md"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      {selectedFile?(<DisplayPDF  file={selectedFile}/>):null}
      
    </div>
  );
}

export default InputPdf;
