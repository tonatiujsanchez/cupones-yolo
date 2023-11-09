import { FC,  ReactNode } from 'react'
import Head from 'next/head'


import { Navbar } from "@/components"

import { Raleway } from "next/font/google"
const RalewayFont = Raleway({
    weight: ['300', '400', '500', '600', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})


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
            <div className={`${RalewayFont.className}`}>
                <Navbar />
                { children }
            </div>
        </>
    )
}
