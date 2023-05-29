import React, { useState } from 'react'
import Canvas from './Canvas'
import { BsCircle, BsPenFill } from 'react-icons/bs'
import { BiSquare } from 'react-icons/bi'

const CanvasContainer = () => {
    const list: string[] = ["tomato", "lightseagreen", "white", "grey", "hotpink", "red"]
    const [shape, setShape] = useState<'square' | 'circle' | null>(null)
    const [color, setColor] = useState<string>("white")
    return (
        <div className='w-full relative h-screen grid place-items-center bg-[#202020]'>
            <div className='absolute bg-white/10 left-4 rounded-xl flex flex-col items-center gap-2 p-4'>
                <BsPenFill className="text-white my-2 " />
                {list.map((x: string, i: number) => {
                    return (
                        <div onClick={() => setColor(x)} key={x} style={{ background: x }} className={`cursor-pointer ${color === "x" ? "border-2 border-black" : ""} hover:scale-110  rounded-md h-5 w-5`}>
                        </div>
                    )
                })}
            </div>

            <div className='absolute text-xl flex p-3 items-center gap-3 top-2 left-[50%] -translate-x-[50%] bg-white/10 text-white rounded-md'>
                <div onClick={()=>setShape("square")} className={`p-1 ${shape==="square"?"bg-white text-black":""}  cursor-pointer rounded-md`}>
                    <BiSquare />
                </div>
                <div onClick={()=>setShape("circle")} className={`p-1 ${shape==="circle"?"bg-white text-black":""}  cursor-pointer rounded-md`}>
                <BsCircle className='cursor-pointer text-lg' />
                </div>

                
            </div>

            <Canvas shape = {shape} color={color} />
        </div>
    )
}

export default CanvasContainer