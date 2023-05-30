import { Account, Client, Databases, Query } from 'appwrite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import DashboardNav from './DashboardNav'


type document =  {
    email: string;
    name: string;
    uid: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions?: (null)[] | null;
    $collectionId: string;
    $databaseId: string;
  }
  

const Dashboard = () => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    const [invitations, setInvitations] = useState([])
    const [input,setInput] = useState<string>("")
    const [searchResult, setSearchResult] = useState<any>([])



    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const account = new Account(client)
    const databases = new Databases(client)

    const getClient = async () => {
        try {
            const promise = await account.get();
            return promise
        } catch (error) {
            throw new Error()
        }
    }

    const { data, isLoading } = useQuery("userData", getClient, {
        onError: () => router.push("/login")
    })

    const searchUser = (email:string) => {
        setInput(email)
        databases.listDocuments("6475e4e81155c46f87b6", "6475e4fa4c0ac8bdb6cc",[Query.search("email",email)])
            .then(d => setSearchResult(d.documents))
            .catch(err => console.log(err))
    }


    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center flex-col'>
                Loading..
            </div>
        )
    }


    return (
        <main className='bg-black relative text-white min-h-screen w-full'>
            <DashboardNav />
            <section className='max-w-[1300px] w-full relative mx-auto pt-[120px] '>
                <button onClick={() => setShow(true)} className='border-[1px] border-white/20 bg-[#202020] text-white/50 text-sm  p-2 px-3 font-[500] rounded-md hover:text-green-400 hover:border-green-400 trans'>New Project</button>
                {show && (
                    <div className='block mt-5'>
                        <input type="text" placeholder='Project name' className='primary-input p-3' />
                        <div className="flex gap-3 mt-3">
                            <input value = {input} onChange={(e)=>searchUser(e.target.value)} type="text" className='primary-input p-3' />
                        </div>
                    </div>
                )}
                {}
            </section>
        </main>
    )
}

export default Dashboard