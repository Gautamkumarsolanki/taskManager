import React from 'react'

export default function Navbar({logout}) {
    return (
        <div className="flex items-center justify-between flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
            <svg className="w-8 h-8 text-indigo-600 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <div className='flex space-x-2'>
                <button onClick={logout} className="w-20 hover:bg-blue-300 h-8 ml-auto overflow-hidden rounded-md cursor-pointer">Logout</button>
                <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                    <img src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512" alt="" />
                </button>
            </div>
        </div>
    )
}
