import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDark, setWite,setSystemMode } from '../Redux/reducerFunction';
import { Moon, Sun, Monitor } from 'lucide-react';

function ModeMenu({ setModeMenu }) {
    const dark = useSelector((state) => state.app.dark);
    const dispatch = useDispatch();

    const darkModOn = () => {
        dispatch(setDark());
        closeMenu();
    };

    const darkModOff = () => {
        dispatch(setWite());
        closeMenu();
    };

    const AutoMode = () => {
        dispatch(setSystemMode());
        closeMenu();
    };

    const closeMenu = () => {
        setModeMenu(false);
    };

    return (
        <div className={`${dark ? 'bg-gray-800' : 'bg-white'} absolute top-12 right-0 w-52 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50`}>
            <div className="p-2">
                <button
                    onClick={darkModOn}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md
                        ${dark ? 'bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'}
                        transition-colors duration-150 ease-in-out`}
                >
                    <Moon size={18} className="mr-2" />
                    Dark Mode
                </button>

                <button
                    onClick={darkModOff}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md mt-1
                        ${!dark ? 'bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-gray-300'}
                        transition-colors duration-150 ease-in-out`}
                >
                    <Sun size={18} className="mr-2" />
                    Light Mode
                </button>

                <button
                    onClick={AutoMode}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md mt-1
                        ${dark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}
                        transition-colors duration-150 ease-in-out`}
                >
                    <Monitor size={18} className="mr-2" />
                    Auto Mode
                </button>
            </div>
        </div>
    );
}

export default ModeMenu;