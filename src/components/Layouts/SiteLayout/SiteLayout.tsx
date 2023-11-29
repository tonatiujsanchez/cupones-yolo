import { FC,  ReactNode } from 'react'
import Head from 'next/head'
import { fonts } from '@/fonts'


import { Navbar } from "@/components"

interface Props{
    children:  ReactNode
}
export const SiteLayout:FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>YoloStyle - Encuentra tu estilo</title>
                <meta name="description" content="YoloStyle - Encuentra tu estilo" />
            </Head>
            <div className={ fonts.Raleway.className }>
                <Navbar />
                { children }
            </div>
        </>
    )
}
