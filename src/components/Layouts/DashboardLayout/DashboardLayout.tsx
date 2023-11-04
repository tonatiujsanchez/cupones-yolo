
import { Raleway } from "next/font/google"
const RalewayFont = Raleway({
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

export const DashboardLayout = () => {

    return (
        <div className={`${RalewayFont.className}`}>
            DashboardLayout
        </div>
    )
}
