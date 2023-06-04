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
        <section className='my-[3rem] bg-white/10 p-6  rounded-lg drop-shadow-xl'>
            <h2 className='text-xl font-semibold'>Your Projects</h2>
            <div className='flex flex-wrap items-center gap-6 mt-8'>
                {!error && projects?.map((x) =>
                    <Link href={`/projects/${x["$id"]}`} key={x["$id"]} className={`h-[130px] trans relative  hover:scale-110  rounded-lg bg-black group border-b-2 border-green-400 w-[130px]  text-white grid place-items-center  cursor-pointer font-bold`}>
                        <div className='w-full h-full relative group overflow-hidden'>
                            <div className='absolute z-10 text-sm absolute-center opacity-0 group-hover:opacity-100 trans'>{x.name}</div>
                            <img src={x.data} alt="canvas" className='relative group-hover:opacity-25 trans' />
                        </div>
                    </Link>)}
            </div>

        </section>
    )
}

export default Projects