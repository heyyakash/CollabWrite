import React, { useState } from 'react'
import Canvas from './Canvas'
import { BsPenFill } from 'react-icons/bs'


const CanvasContainer = () => {
    const list: string[] = ["tomato", "lightseagreen", "white", "grey", "hotpink", "red"]
    
    const [color, setColor] = useState<string>("white")
    return (
        <div className=' relative h-screen  w-[75%] '>
            <div className='absolute bg-black/20 left-4 rounded-xl top-[50%] -translate-y-[50%] flex flex-col items-center gap-2 p-4'>
                <BsPenFill className="text-white my-2 " />
                {list.map((x: string, i: number) => {
                    return (
                        <div onClick={() => setColor(x)} key={x} style={{ background: x }} className={`cursor-pointer ${color === "x" ? "border-2 border-black" : ""} hover:scale-110  rounded-md h-5 w-5`}>
                        </div>
                    )
                })}
            </div>



            <Canvas color={color} />
        </div>
    )
}

export default CanvasContainer