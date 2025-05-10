import React, { useEffect, useState } from 'react';
import { SlidersHorizontal, Bell, User, ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
const user = {
    name: 'John Doe',
    email: 'john@gmail.com'
}

const Navbar = () => {
    const [display, setDisplay] = useState(true);
    const handleClick = () => {
        setDisplay(!display);
    }
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (showDropdown && !event.target.closest('.dropdown') && !event.target.closest('.user-dropdown-trigger')) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div>
            <div className={`fixed top-0 right-0 z-50 h-14 ${display ? 'left-[250px]' : 'left-0'} bg-white shadow-md transition-all duration-1000`}>
                <div className="flex items-center justify-between bg-white p-3 border-b border-gray-200">
                    <div onClick={handleClick} className="flex items-center ml-2">
                        <SlidersHorizontal size={22} className="text-black cursor-pointer" />
                    </div>
                    <div className="flex items-center space-x-4 mr-4 gap-4">
                        <Bell size={20} className="text-black" />
                        <div 
                            className='flex items-center space-x-2 cursor-pointer relative user-dropdown-trigger' 
                            onClick={toggleDropdown}
                        >
                            <div className='rounded-full bg-gray-100 p-2'><User size={20} className="text-black" /></div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user.name}</span>
                                <span className="text-xs text-gray-500">{user.email}</span>
                            </div>
                            <ChevronDown className="text-black" />
                            {showDropdown && (
                                <div className="dropdown absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</div>
                                    <div className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</div>
                                    <div className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar display={display}/>
        </div>
    )
}

export default Navbar;