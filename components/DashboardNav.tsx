import React from 'react'
import { MdHandshake } from 'react-icons/md'
import { BiBell } from 'react-icons/bi'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { Account, Client } from 'appwrite'
import { useRouter } from 'next/router'

const DashboardNav = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const account = new Account(client)
    const router = useRouter()

    const handleLogOut = () => {
        const promise = account.deleteSessions();

        promise.then(function (response) {
            router.push("/login")
        }, function (error) {
            alert(error) // Failure
        });
    }

    return (
        <nav className='h-[80px] fixed w-full bg-black z-[1000] border-b border-white/20'>
            <div className='h-full mx-auto max-w-[1300px] flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <MdHandshake className='text-3xl' />
                    <h3 className='font-bold primary-gradient text-transparent bg-clip-text'>Collaborate</h3>
                </div>
                <div className='flex text-xl trans text-white/50 items-center cursor-pointer  gap-4'>
                    <BiBell className='hover:text-white trans' />
                    <FiSettings className='hover:text-white trans' />
                    <FiLogOut onClick={handleLogOut} className='hover:text-red-400 trans' />
                </div>
            </div>
        </nav>
    )
}

export default DashboardNav