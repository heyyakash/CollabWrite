import { Account, Client, Databases, Models, Query } from 'appwrite'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

const Projects = () => {
    

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const databases = new Databases(client)
    const queryClient = useQueryClient()
    const userData: any = queryClient.getQueryData("userData")


    const getProjects = async () => {
        const data = await databases.listDocuments("6475e4e81155c46f87b6", "6475f82bb6f201570328", [Query.search("users", userData["$id"])])
        return data.documents
    }

    const { data: projects, error, isLoading } = useQuery<Models.Document[]>("projects", getProjects)


    return (
        <section className='my-4'>
            <h2 className='text-xl font-bold'>Projects</h2>
            <div className='flex flex-wrap items-center gap-3 mt-4'>
                {!error && projects?.map((x)=><Link href={`/projects/${x["$id"]}`} key = {x["$id"]} className='h-[130px] trans  hover:scale-110  rounded-md bg-white/20 w-[130px] text-white grid place-items-center bg-white cursor-pointer font-bold'>{x.name}</Link>)}    
            </div>
            
        </section>
    )
}

export default Projects