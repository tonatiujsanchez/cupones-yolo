import type { AppProps } from 'next/app'
import { TanStackProvider } from '@/providers'
import { Toaster } from 'sonner'

import '@/scss/global.scss'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <TanStackProvider>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </TanStackProvider>
  )
}
