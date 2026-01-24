import React from 'react'

function TopBar() {
    return (
        <div className="w-full bg-[#533e2d] text-white py-2 shadow-md rounded-b-lg "> {/* The main container for the top bar */}
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                {/* Contact Info section on the left */}
                <div className="text-sm mb-2 sm:mb-0 flex items-center">
                    <span className="mr-4 flex items-center">
                        <i className="fas fa-phone mr-1"></i> +1 (123) 456-7890
                    </span>
                    <span className="flex items-center">
                        <i className="fas fa-envelope mr-1"></i> info@example.com
                    </span>
                </div>

                {/* Social Icons section on the right */}
                <div className="flex space-x-4">
                    {/* Facebook Icon */}
                    <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                    {/* Twitter Icon */}
                    <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <i className="fab fa-twitter text-lg"></i>
                    </a>
                    {/* Instagram Icon */}
                    <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <i className="fab fa-instagram text-lg"></i>
                    </a>
                    {/* LinkedIn Icon */}
                    <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    {/* YouTube Icon */}
                    <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <i className="fab fa-youtube text-lg"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopBar