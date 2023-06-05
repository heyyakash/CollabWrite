import { Account, Client, Databases, ID, Models, Query } from 'appwrite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQueries, useQuery, useQueryClient } from 'react-query'
import DashboardNav from './DashboardNav'
import Projects from './Projects'
import {AiOutlineArrowRight} from 'react-icons/ai'
import getProjects from '@/helpers/db_functions'
import AddProject from './AddProject'
import getClient from '@/helpers/getUser'
import getInitialClient from '@/helpers/getClient'




const Dashboard = () => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const projects : any= queryClient.getQueryData("projects")
    const {client, account, databases} = getInitialClient()

 
    //get user data
    const { data, isLoading } = useQuery<any>("userData", ()=>getClient(account), {
        onError: () => router.push("/")
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
            <section className='max-w-[1200px] w-full relative mx-auto pt-[120px] '>
                <div className='flex items-center justify-between'>
                    <div className='p-6 first:col-span-2'><span className='text-xl leading-2 font-semibold text-white/70 bg-clip-text primary-gradient text-transparent'>Hello</span><span className='text-white text-[3rem] font-semibold block'>{data.name} 👋</span></div>
                    <div className="flex items-center justify-center w-[300px]  h-[130px] rounded-lg primary-gradient">
                        <p className='text-[3rem] font-semibold  text-black'>{projects?.length}<span className='text-sm'>Projects</span></p>
                    </div>
    
                </div>
       
                <Projects show = {show} setShow = {setShow} />
                <AddProject show = {show} setShow = {setShow} />
  
            </section>
        </main>
    )
}

export default Dashboard