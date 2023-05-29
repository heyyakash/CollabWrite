import React, { useState } from 'react'
import Canvas from './Canvas'

const CanvasContainer = () => {
    const list: string[] = ["tomato", "lightseagreen","black","grey","hotpink","red"]
    const [color, setColor] = useState<string>("black")
    return (
        <div className='w-full relative h-screen grid place-items-center bg-gray-200'>
            <div className='absolute bg-white left-4 rounded-xl flex flex-col items-center gap-2 p-4'>
                <p>Pen Color</p>
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