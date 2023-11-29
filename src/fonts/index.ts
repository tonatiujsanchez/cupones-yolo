import { Raleway } from "next/font/google"

const RalewayFont = Raleway({
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

export const fonts = {
    Raleway: RalewayFont
}