import React from 'react'
import { BsFillSendFill } from 'react-icons/bs'

const Chat = () => {
    const sendChat = (e:React.SyntheticEvent) => {
        e.preventDefault()
    }
    return (
        <div className='w-[25%] h-screen hidden xl:block p-5'>
        <div className='w-full flex flex-col rounded-md drop-shadow-2xl h-full relative text-white overflow-auto bg-black/60'>
            <div className='p-3 h-[50px]  text-lg font-semibold border-b-2 border-green-300 sticky bg-black'><p className='text-transparent bg-clip-text primary-gradient'>Team Chat</p></div>
            <form onSubmit = {sendChat} className='h-[50px] bg-black  text-lg font-semibold text-white fixed bottom-0 w-[100%] '>

                <input type="text" className='bg-transparent h-full text-white outline-none w-[90%] px-3' placeholder='Enter Message' />
                <button type="submit" className='primary-gradient cursor-pointer relative text-black h-full w-[10%]'>
                    <BsFillSendFill className='text-2xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
                </button>
            </form>
        </div>
        </div>
    )
}

export default Chat