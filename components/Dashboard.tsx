import { Account, Client, Databases, ID, Query } from 'appwrite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQueries, useQuery, useQueryClient } from 'react-query'
import DashboardNav from './DashboardNav'
import Projects from './Projects'
import {AiOutlineArrowRight} from 'react-icons/ai'

type document = {
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

type inviationType = {
    name: string,
    email: string
}

const Dashboard = () => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    const [invitations, setInvitations] = useState<inviationType[]>([])
    const [input, setInput] = useState<string>("")
    const [projectId, setProjectId] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [searchResult, setSearchResult] = useState<any>([])
    const queryClient = useQueryClient()
    const projects : any= queryClient.getQueryData("projects")

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const account = new Account(client)
    const databases = new Databases(client)

    const getClient = async () => {
        const promise = await account.get();
        return promise
    }

    const { data, isLoading } = useQuery<any>("userData", getClient, {
        onError: () => router.push("/")
    })

    const searchUser = (email: string) => {
        setInput(email)
        databases.listDocuments("6475e4e81155c46f87b6", "6475e4fa4c0ac8bdb6cc", [Query.search("email", email)])
            .then(d => setSearchResult(d.documents))
            .catch(err => console.log(err))
    }

    const addProject = () => {
        if (projectName.length > 0) {
            const project_id = ID.unique()
            databases.createDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", project_id, {
                admin: data?.email,
                users: [data["$id"]],
                name: projectName
            })
                .then(d => {
                    console.log("done")
                    setProjectId(d["$id"])
                })
                .catch(err => console.log(err))
        }
    }

    const sendInvitation = (email: string, name: string) => {
        databases.createDocument("6475e4e81155c46f87b6", "6475fafb1adfd9a909c5", ID.unique(), {
            from: data?.email,
            to: email,
            from_name: data?.name,
            project_name: projectName,
            project_id: projectId
        })
            .then(d => {
                console.log(d)
                setSearchResult([])
                setInvitations(((invitations) => [...invitations, { name, email }]))
            })
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
            <section className='max-w-[1200px] w-full relative mx-auto pt-[120px] '>
                <div className='grid gap-6 grid-cols-4'>
                    <div className='p-6 first:col-span-2'><span className='text-xl leading-2 font-semibold text-white/70 bg-clip-text primary-gradient text-transparent'>Hello</span><span className='text-white text-[3rem] font-semibold block'>{data.name} 👋</span></div>
                    <div className="flex items-center justify-center  h-[130px] rounded-lg primary-gradient">
                        <p className='text-[3rem] font-semibold text-black'>{projects?.length}<span className='text-sm'>Projects</span></p>
                    </div>
                    <div className="flex items-center justify-center  h-[130px] rounded-lg primary-gradient p-1">
                        <div className='bg-black w-full h-full rounded-lg cursor-pointer flex items-center justify-center gap-2'>
                            <p className='font-[500] text-2xl'>New Project</p>
                            <AiOutlineArrowRight className='text-2xl' />
                        </div>
                        {/* <p className='text-[3rem] font-semibold text-black'>{projects?.length}</p> */}
                    </div>
                </div>

                {/* <button onClick={() => setShow(true)} className='border-[1px] border-white/20 bg-[#202020] text-white/50 text-sm  p-2 px-3 font-[500] rounded-md hover:text-green-400 hover:border-green-400 trans'>New Project</button>
                {show && (
                    <div className='block mt-5'>
                        <div className='flex items-center gap-3'>
                            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" placeholder='Project name' className='primary-input p-3' />
                            <button onClick={()=>addProject()} className=' text-green-500 text-sm font-semibold border-[1px] border-green-400 rounded-lg p-3'>Add Project</button>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <input value={input} placeholder='Collaborator email' onChange={(e) => searchUser(e.target.value)} type="text" className='primary-input p-3' />
                        </div>
                    </div>
                )}
                {searchResult.length !== 0 ? <div className='w-[500px] rounded-xl bg-white/20 max-h-[300px] p-1  mt-3 overflow-auto'>
                    {searchResult.map((x: document, i: number) => {
                        return (
                            <div onClick={()=>sendInvitation(x.email, x.name)} key={i} className=' flex p-4 trans hover:primary-gradient  hover:text-black rounded-xl cursor-pointer items-center justify-between'>
                                <p>{x.email}</p>
                                <p className='font-semibold'>{x.name}</p>
                            </div>
                        )
                    })}
                </div> : (<></>)} */}
                <Projects />
            </section>
        </main>
    )
}

export default Dashboard