import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";


export default function FilteredProduct({category, onClick, isActive}) {
  return (
    <div onClick={onClick} className='rounded-lg shadow-lg p-3 cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out'>
        <div className={`text-3xl p-5 rounded-full w-50 h-50 flex justify-center items-center cursor-pointer ${isActive ? "bg-red-500 text-white" : 'bg-yellow-500'}`}>
            <CiForkAndKnife />
          </div>
          <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}
