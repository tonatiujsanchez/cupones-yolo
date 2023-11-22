import type { AppProps } from 'next/app'
import '@/scss/global.scss'
import { TanStackProvider } from '@/providers'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <TanStackProvider>
      <Component {...pageProps} />
    </TanStackProvider>
  )
}
