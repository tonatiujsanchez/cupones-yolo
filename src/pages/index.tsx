import { BrandsSection, CouponsSection, HeroSection, SiteLayout } from '@/components'


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
