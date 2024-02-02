import type { AppProps } from 'next/app'
import { TanStackProvider } from '@/providers'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'sonner'
import { PRIMARY_COLOR } from '@/constants'

import '@/scss/global.scss'


export default function App({ Component, pageProps }: AppProps) {
    return (
        <TanStackProvider>
            <NextNProgress color={ PRIMARY_COLOR } height={5} />
            <Toaster richColors position="top-right" />
            <Component {...pageProps} />
        </TanStackProvider>
    )
}
