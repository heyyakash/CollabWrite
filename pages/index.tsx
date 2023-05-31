import Image from 'next/image'
import { Inter } from 'next/font/google'
import Canvas from '@/components/Canvas'
import { useState } from 'react'
import CanvasContainer from '@/components/CanvasContainer'
import Login from '@/components/Login'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
 <>
 <Login />
 </>
  )
}
