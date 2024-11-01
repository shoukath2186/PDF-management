import React,{useState,useRef,useEffect} from 'react'
import { CiBrightnessUp } from "react-icons/ci";
import { MdBrightness3 } from "react-icons/md";


import { useSelector } from 'react-redux'

import ModeMenu from '../Pages/modeMenu';

function NaveBare() {
    const [modeMenu,setModeMenu]=useState(false)
    const dark = useSelector((state) => state.app.dark);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setModeMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${dark ? 'bg-gray-800' : 'bg-slate-100'} w-full h-[65px] flex items-center justify-between shadow-xl fixed top-0 left-0 z-50`}>
            <div className='ml-5 sm:ml-20'>
                <h1 className={` ${dark ? 'text-blue-200' : 'text-blue-700'} font-bold text-3xl`}>DocuDrop</h1>
            </div>
            <div className='mr-5 sm:mr-20 relative' ref={menuRef}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl  border 'bg-gray-800' border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 `}
                onClick={()=>setModeMenu(!modeMenu)}>
                    {dark ? <MdBrightness3 size="20" className="text-yellow-500" /> : <CiBrightnessUp size="20" className="text-yellow-600" />}
                </div>
                {modeMenu?(<ModeMenu setModeMenu={setModeMenu}/>):null}
            </div>
        </div>
    )
}

export default NaveBare