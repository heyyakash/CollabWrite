import React, { useState } from 'react'
import { BsCircle, BsEraser, BsPenFill, BsPencil } from 'react-icons/bs'
import { BiSquare, BiUndo } from 'react-icons/bi'
import { shapes } from '@/types/shapes'
import { AiOutlineDownload } from 'react-icons/ai'
import { MdOutlineClear } from 'react-icons/md'

type props = {
    setShape : React.Dispatch<React.SetStateAction<shapes>>
    shape:  shapes
    download: ()=>void
    clear:()=>void
    undo:()=>void
}

const UpperToolBar = ({setShape, shape, clear, undo, download}:props) => {
    
    return (
        <div className='absolute text-xl flex p-3 items-center gap-3 top-2 left-[50%] -translate-x-[50%] bg-black/20 text-white rounded-md'>
            <div onClick={() => setShape("square")} className={`p-1 ${shape === "square" ? "bg-white text-black" : ""}  cursor-pointer rounded-md`}>
                <BiSquare />
            </div>
            <div onClick={() => setShape("circle")} className={`p-1 ${shape === "circle" ? "bg-white text-black" : ""}  cursor-pointer rounded-md`}>
                <BsCircle className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape(null)} className={`p-1 ${!shape ? "bg-white text-black" : ""}  cursor-pointer rounded-md`}>
                <BsPencil className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("erasure")} className={`p-1 ${shape === "erasure" ? "bg-white text-black" : ""}  cursor-pointer rounded-md`}>
                <BsEraser className='cursor-pointer text-lg' />
            </div>
            <div className='bg-white h-6 w-[2px]'></div>
            <div onClick={() => undo()} className={`p-1   cursor-pointer rounded-md`}>
                <BiUndo className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => download()} className={`p-1   cursor-pointer rounded-md`}>
                <AiOutlineDownload className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => clear()} className={`p-1   cursor-pointer rounded-md`}>
                <MdOutlineClear className='cursor-pointer text-red-500 text-lg' />
            </div>

        </div>
    )
}

export default UpperToolBar