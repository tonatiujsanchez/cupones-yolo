import type { AppProps } from 'next/app'
import { TanStackProvider } from '@/providers'
import '@/scss/global.scss'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <TanStackProvider>
      <Component {...pageProps} />
    </TanStackProvider>
  )
}
