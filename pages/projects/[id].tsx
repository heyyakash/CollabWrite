import Image from 'next/image'
import { Inter } from 'next/font/google'
import Canvas from '@/components/Canvas'
import { useState } from 'react'
import CanvasContainer from '@/components/CanvasContainer'
import { useRouter } from 'next/router'
import { Account, Client, Databases, Models } from 'appwrite'
import { useQuery, useQueryClient } from 'react-query'
import Chat from '@/components/Chat'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const account = new Account(client)
  const databases = new Databases(client)


  const getProject = async () => {
    const { id } =  router.query
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
 

  const { data: project, error, isLoading } = useQuery("project", getProject)


  if (isLoading) return <div className='w-full h-screen grid place-items-center'>Loading</div>
  // if (error) {
  //   router.push("/dashboard")
  // }

  return (
    <div className='flex'>
      <CanvasContainer />
      <Chat />
    </div>
  )
}
