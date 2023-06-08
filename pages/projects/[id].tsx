import Image from 'next/image'
import { Inter } from 'next/font/google'
import Canvas from '@/components/Canvas'
import { useState } from 'react'
import CanvasContainer from '@/components/CanvasContainer'
import { useRouter } from 'next/router'
import { Account, Client, Databases, Models } from 'appwrite'
import { useQuery, useQueryClient } from 'react-query'
import Chat from '@/components/Chat'
import getChats from '@/helpers/getChats'
import Loading from '@/components/Loading'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [chats,setChats] = useState<string[] | null>(null)
  const [chatId, setChatId] = useState<string>("")
  const { id } = router.query
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const account = new Account(client)
  const databases = new Databases(client)


  const getProject = async (id:string) => {

    const data = await databases.getDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id as string)
    return data
  }

  const getClient = async () => {
    try {
      const promise = await account.get();
      return promise
    } catch (error) {
      throw new Error()
    }
  }

  const { data:userData, isLoading:clientLoading } = useQuery<any>("userData", getClient, {
    onError: () => router.push("/login")
  })
 

  const { data: project, error, isLoading } = useQuery("project", ()=>getProject(id as string),{
    refetchIntervalInBackground:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false,
    refetchInterval:false
  })
  const { error: chatError, isLoading:chatIsLoading} = useQuery("chats", ()=>getChats(id as string),{
    onSuccess(data) {
        if (data.documents.length>0) {
            console.log(data.documents)
            setChats(data.documents[0].chats as string[])
            setChatId(data.documents[0]["$id"])
        }
    },
})

  if (isLoading) return <div className='w-full h-screen'>
    <Loading />
  </div>
  // if (error) {
  //   router.push("/dashboard")
  // }

  return (
    <div className='flex relative bg-[url("/pattern.png")] bg-repeat bg-contain'>
      <CanvasContainer />
      <Chat chats = {chats as string[]} setChats={setChats} chatId={chatId} />
    </div>
  )
}
