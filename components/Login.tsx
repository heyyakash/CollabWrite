import { Account, Client, ID } from 'appwrite'
import React from 'react'
import { useForm } from 'react-hook-form'

type SignInDetails = {
    email: string
    password: string
}

type SignUpDetails = SignInDetails & {
    fname: string
    lname: string
 
}

const Login = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const {register:signUpRegister, handleSubmit} = useForm<SignUpDetails>()
    const {register:signInRegister} = useForm<SignInDetails>()



    const handleSignUp = (data:SignUpDetails) => {
        console.log(data)
        const account = new Account(client)
        account.create(
            ID.unique(),
            data.email,
            data.password,
            data.fname.charAt(0).toUpperCase() + data.fname.slice(1) + " " + data.lname.charAt(0).toUpperCase() + data.lname.slice(1)
        )

    }

    const handleSignIn = (data:SignInDetails) => {
        console.log(data)
    }

    return (
        <section className='min-h-screen w-full flex items-center justify-center flex-col gap-2 bg-[#121212] text-white'>
            <h2 className='text-[2.5rem] font-[700]'>Login to Your Account</h2>
            <p className='text-lg w-[500px] text-white/40 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, saepe?</p>
            <div className='flex gap-5 items-center mt-5 justify-evenly min-w-[700px]'>

                <form className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign In</p>
                    <input required {...signInRegister("email")} type="text" placeholder='email' className='primary-input' />
                    <input required {...signInRegister("password")} type="password" placeholder='password' className='primary-input' />
                    <input type="submit" value="Sign In" className='primary-input primary-gradient text-black font-semibold cursor-pointer ' />
                </form>

                <p className='text-2xl font-bold'>/</p>

                <form onSubmit={handleSubmit(handleSignUp)} className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign Up</p>
                    <div className='flex gap-3'>
                        <input required type="text" {...signUpRegister("fname")} placeholder='first name' className='primary-input w-[calc(160px-.375rem)]' />
                        <input required type="text" {...signUpRegister("lname")} placeholder='last name' className='primary-input w-[calc(160px-.375rem)]' />
                    </div>
                    <input required type="email" {...signUpRegister("email")} placeholder='email' className='primary-input' />
                    <div className='flex gap-3'>
                        <input required type="password" {...signUpRegister("password")} placeholder='password' className='primary-input w-[calc(220px-.375rem)]' />
                        <input type="submit" value="Sign Up" className='primary-input primary-gradient cursor-pointer trans  text-black font-semibold w-[calc(100px-.375rem)]' />
                    </div>

                </form>
            </div>
        </section>

    )
}

export default Login