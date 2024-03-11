import { FC,  ReactNode } from 'react'
import Head from 'next/head'
import { Navbar } from "@/components"


const metatagsDefault = {
    title: 'YoloStyle - Encuentra tu estilo'
}

interface Props {
    children:  ReactNode
    metatags?: {
        title: string
    }
}
export const SiteLayout:FC<Props> = ({ children, metatags = metatagsDefault }) => {
    
    const { title } = metatags

    return (
        <>
            <Head>
                <title>{ title }</title>
                <meta name="description" content="YoloStyle - Encuentra tu estilo" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <div>
                <Navbar />
                { children }
            </div>
        </>
    )
}
