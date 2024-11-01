import React, { useState, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';

const PDFViewer = ({ file }) => {

    const dark = useSelector((state) => state.app.dark);
    const [pages, setPages] = useState([]);

    const [selectedPages, setSelectedPages] = useState(new Set());
    
    const scrollingRef = useRef()

    const goToPage = (direction) => {
        if (scrollingRef.current) {
            const scrollAmount = 300; 
            scrollingRef.current.scrollLeft += direction * scrollAmount;
        }
    };

    const handlePageSelect = (pageNumber) => {
        const newSet = new Set(selectedPages);
        if (newSet.has(pageNumber)) {
            newSet.delete(pageNumber)
        } else {
            newSet.add(pageNumber)
        }
        setSelectedPages(newSet)
    }

    function handileSubmit(){

        
    }

    return (
        <div className={`w-full mt-9 mx-auto p-4 space-y-4 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
            {/* Controls */}
            <div className={`${dark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">PDF Viewer</h1>
                    <div className="flex items-center gap-4">

                        {/* Download button */}

                        <button
                            onClick={() => handileSubmit()}
                            disabled={selectedPages.size === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedPages.size > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : `${dark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                                }`}
                        >
                            <Download className="w-4 h-4" />
                            <span>Download ({selectedPages.size})</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* PDF Display */}
            <div className={`${dark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                <div className="relative">
                    {/* Placeholder for PDF content */}
                    <div
                        className={`w-full  flex items-center justify-center rounded-lg border ${dark
                            ? 'bg-gray-900 border-gray-700'
                            : 'bg-gray-50 border-gray-200'
                            }`}
                        style={{  transformOrigin: 'center center' }}
                    >
                        <div className={`w-full h-full ${dark ? 'bg-gray-700' : 'bg-gray-300'}  flex items-center justify-between overflow-auto`} ref={scrollingRef}>
                            <Document
                                className='flex items-center justify-between'
                                file={file}
                                onLoadSuccess={({ numPages }) => setPages(numPages)}
                                onLoadError={(error) => console.error('PDF Load Error:', error)}
                                loading={<div>Loading PDF...</div>}
                            >

                                {Array.from(new Array(pages), (_, ind) => (
                                    <div key={ind} className={`m-4  shadow-xl  ${selectedPages.has(ind) ? `p-1 ${dark ? 'bg-green-500' : 'bg-green-700'} ` : 'p-0'}`}>
                                        <Page
                                            pageNumber={ind + 1}
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                            width={300} 
                                            onClick={() => handlePageSelect(ind)}
                                        />
                                        <p className='text-black text-sm w-full text-center bg-white'> {ind + 1} / {pages}</p>
                                    </div>
                                ))}
                            </Document>



                            {/* <div className='min-w-[280px]  m-4 h-[400px] rounded-lg shadow-xl p-6 border border-blue-400'>asd</div> */}

                        </div>

                    </div>


                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                        onClick={() => goToPage(-1)}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${dark
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-600'
                            }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>


                    <button
                        onClick={() => goToPage(1)}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${dark
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-600'
                            }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {Array.from(selectedPages).length > 0 && (
                <div className={`${dark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
                    <h3 className="text-lg font-medium mb-2">Selected Pages</h3>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(selectedPages).map((pageNum) => (
                            <div
                                key={pageNum}
                                className={`flex items-center gap-2 px-3 py-1 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}
                            >
                                <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Page {pageNum + 1}
                                </span>
                                <button
                                    onClick={() => handlePageSelect(pageNum)}
                                    className={`p-1 rounded-full transition-colors ${dark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFViewer;