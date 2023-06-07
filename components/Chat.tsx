import getChats from '@/helpers/getChats'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useQuery } from 'react-query'
import ChatBody from './ChatBody'
import sendChats from '@/helpers/sendChat'
import { chat } from '@/types/chats'
import getInitialClient from '@/helpers/getClient'

const Chat = () => {
    const [chats,setChats] = useState<string[]>([])
    const [chatId, setChatId] = useState<string>("")
    const router= useRouter()
    const [msg,setMsg] = useState<string>("")
    const {id} = router.query
    const {error, isLoading} = useQuery("chats", ()=>getChats(id as string),{
        onSuccess(data) {
            if (data.documents.length>0) {
                console.log(data.documents)
                setChats(data.documents[0].chats as string[])
                setChatId(data.documents[0]["$id"])
            }
        },
    })
    const {client} = getInitialClient()

    useEffect(()=>{
        if(chatId.length>0){
            const unsubscribe = client.subscribe([`databases.${process.env.NEXT_PUBLIC_APPWRITE_DB as string}.collections.${process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string}.documents.${chatId}`, 'files'], (response: any) => {
                setChats(response.payload.chats)
            });
            return () => unsubscribe()
        }
         
    },[])

    const sendChatHandler = (e:React.SyntheticEvent) => {
        console.log("clicked")
        e.preventDefault()
        if(msg.length<1) return;
        sendChats(msg,chats,chatId)
        setMsg("")
    }
    if(!isLoading && !error)
    return (
        <div className='w-[25%] h-screen hidden xl:block p-5'>
        <div className='w-full flex flex-col rounded-md drop-shadow-2xl h-full relative text-white overflow-auto bg-black/60'>
            <div className='p-3 h-[50px]  text-lg font-semibold border-b-2 border-green-300 sticky bg-black'><p className='text-transparent bg-clip-text primary-gradient'>Team Chat</p></div>
            <div className='h-full  pb-[50px] '>
                <ChatBody chatList={chats} />
            </div>
            <form onSubmit = {(e)=>sendChatHandler(e)} className='h-[50px] bg-black  text-lg font-semibold text-white fixed bottom-0 w-[100%] '>
                <input value={msg} onChange={(e)=>setMsg(e.target.value)} type="text" className='bg-transparent h-full text-white outline-none w-[90%] px-3' placeholder='Enter Message' />
                <button type="submit" className='primary-gradient cursor-pointer relative text-black h-full w-[10%]'>
                    <BsFillSendFill className='text-2xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
                </button>
            </form>
        </div>
        </div>
    )
    return(
        <></>
    )
}

export default Chat