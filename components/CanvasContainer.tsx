import React, { useState } from 'react'
import Canvas from './Canvas'
import { BsCircle, BsEraser, BsPenFill, BsPencil } from 'react-icons/bs'
import { BiSquare } from 'react-icons/bi'

const CanvasContainer = () => {
    const list: string[] = ["tomato", "lightseagreen", "black", "grey", "hotpink", "red"]
    const [shape, setShape] = useState<'square' | 'circle' | 'erasure' |null>(null)
    const [color, setColor] = useState<string>("white")
    return (
        <div className=' relative h-screen  w-[75%] bg-[#202020]'>
            <div className='absolute bg-black/20 left-4 rounded-xl top-[50%] -translate-y-[50%] flex flex-col items-center gap-2 p-4'>
                <BsPenFill className="text-white my-2 " />
                {list.map((x: string, i: number) => {
                    return (
                        <div onClick={() => setColor(x)} key={x} style={{ background: x }} className={`cursor-pointer ${color === "x" ? "border-2 border-black" : ""} hover:scale-110  rounded-md h-5 w-5`}>
                        </div>
                    )
                })}
            </div>

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
                <div onClick={() => setShape("erasure")} className={`p-1 ${shape==="erasure" ? "bg-white text-black" : ""}  cursor-pointer rounded-md`}>
                    <BsEraser className='cursor-pointer text-lg' />
                </div>


            </div>

            <Canvas shape={shape} color={color} />
        </div>
    )
}

export default CanvasContainer