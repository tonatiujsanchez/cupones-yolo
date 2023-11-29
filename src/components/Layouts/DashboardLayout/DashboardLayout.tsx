import { FC, ReactNode } from "react"
import Head from 'next/head'

import { SiteLayout } from "../SiteLayout"
import { Sidebar } from "@/components"

import styles from './DashboardLayout.module.scss'


interface Props{
    children : ReactNode
    headding : string
}
export const DashboardLayout:FC<Props> = ({ children, headding }) => {

    return (
        <>
            <Head>
                <title>YoloStyle - Admin</title>
                <meta name="description" content="YoloStyle - Encuentra tu estilo" />
            </Head>
            <SiteLayout>
                <div className={`container ${ styles['dashboard-container'] }`}>
                     <Sidebar />
                     <main className={ styles['main'] }>
                        <div className={ styles['main-headding__container'] }>
                            <h1>{ headding }</h1>
                        </div>
                        <div className={ styles['main-content'] }>
                            { children }
                        </div>
                     </main>
                </div>
            </SiteLayout>        
        </>
    )
}
