import { FC, ReactNode } from "react"
import Head from 'next/head'

import { SiteLayout } from "../SiteLayout"
import { Sidebar } from "@/components"

import styles from './DashboardLayout.module.scss'


interface Props{
    children:  ReactNode
}
export const DashboardLayout:FC<Props> = ({ children }) => {

    return (
        <>
            <Head>
                <title>YoloStyle - Admin</title>
                <meta name="description" content="YoloStyle - Encuentra tu estilo" />
            </Head>
            <SiteLayout>
                <div className={`container ${ styles['dashboard-container'] }`}>
                     <Sidebar />
                     <main>
                        { children }
                     </main>
                </div>
            </SiteLayout>        
        </>
    )
}
