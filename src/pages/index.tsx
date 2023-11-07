import { BrandsSection, CouponsSection, HeroSection, SiteLayout } from '@/components'
import NextLink from 'next/link'


export default function Home() {

    return (
        <>            
            <SiteLayout>
                <main>
                    <HeroSection />
                    <BrandsSection />
                    <CouponsSection />
                    <NextLink href={'#'}>Hola Mundo!</NextLink>
                    <h1>Yolo Style</h1>
                </main>
            </SiteLayout>
        </>
    )
}
