import { Hero, SiteLayout } from '@/components'
import NextLink from 'next/link'

export default function Home() {

    return (
        <>            
            <SiteLayout>
                <main>
                    <Hero />
                    <NextLink href={'#'}>Hola Mundo!</NextLink>
                    <h1>Yolo Style</h1>
                </main>
            </SiteLayout>
        </>
    )
}
