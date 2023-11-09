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
                </main>
            </SiteLayout>
        </>
    )
}
