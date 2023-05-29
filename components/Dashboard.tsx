import { Account, Client } from 'appwrite'
import { useRouter } from 'next/router'
import React from 'react'
import { useQueries, useQuery } from 'react-query'
import DashboardNav from './DashboardNav'


const Dashboard = () => {
    const router = useRouter()
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const account = new Account(client)

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
            <section className='max-w-[1300px] w-full relative mx-auto pt-[150px] '>
                <button className='border-[1px] border-white/20 bg-[#202020] text-white/50  p-2 px-3 font-[500] rounded-md hover:text-green-400 hover:border-green-400 trans'>New Project</button>
            </section>
        </main>
    )
}

export default Dashboard