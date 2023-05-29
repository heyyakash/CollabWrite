import React from 'react'

const Login = () => {
    return (
        <section className='min-h-screen w-full flex items-center justify-center flex-col gap-2 bg-[#121212] text-white'>
            <h2 className='text-[2.5rem] font-[700]'>Login to Your Account</h2>
            <p className='text-lg w-[500px] text-white/40 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, saepe?</p>
            <div className='flex gap-2 items-center mt-5 justify-evenly min-w-[700px]'>

                <form className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign In</p>
                    <input required type="text" placeholder='email' className='primary-input' />
                    <input required type="password" placeholder='password' className='primary-input' />
                    <input type="submit" value = "Sign In" className='primary-input bg-gradient-to-r from-green-400 to-yellow-300  text-black font-semibold cursor-pointer '  />
                </form>

                <p className='text-2xl font-bold'>/</p>

                <form className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign Up</p>
                    <input required type="text" placeholder='email' className='primary-input' />
                    <input required type="password" placeholder='password' className='primary-input' />
                </form>
            </div>
        </section>

    )
}

export default Login