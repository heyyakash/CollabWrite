import React from 'react'
import { BsFillSendFill } from 'react-icons/bs'

const Chat = () => {
    const sendChat = (e:React.SyntheticEvent) => {
        e.preventDefault()
    }
    return (
        <div className='w-[25%] flex flex-col h-screen relative text-white overflow-auto bg-[#202020]'>
            <div className='p-3 h-[50px] primary-gradient text-lg font-semibold text-white sticky'><p className='text-black bg-clip-text primary-gradient'>Team Chat</p></div>
            <form onSubmit = {sendChat} className='h-[50px] bg-black  text-lg font-semibold text-white fixed bottom-0 w-[25%]'>

                <input type="text" className='bg-transparent h-full text-white outline-none w-[90%]' placeholder='Enter Message' />
                <button type="submit" className='primary-gradient cursor-pointer relative text-black h-full w-[10%]'>
                    <BsFillSendFill className='text-2xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
                </button>
            </form>
        </div>
    )
}

export default Chat