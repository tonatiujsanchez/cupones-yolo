import { FC, ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const queryClient = new QueryClient()

interface Props {
    children: ReactNode
}

export const TanStackProvider:FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={ queryClient }>
            { children }
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}