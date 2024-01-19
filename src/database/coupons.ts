import { db } from '.'
import { CouponSettingsPage, Route } from '@/models'
import { COUPONS_PAGE_SLUG } from '@/constants'
import { ICouponSettingsPage } from '@/interfaces'


export const useGetCouponSettingsPage = async():Promise<ICouponSettingsPage | null> => {

    try {        
        await db.connect()
        const [couponSettingsPage, route] = await Promise.all([
            CouponSettingsPage.findOne().sort({ createdAt: -1 }),
            Route.findOne({ slug: COUPONS_PAGE_SLUG }).select('-_id -status -__v')
        ])
        await db.disconnect()
    
        if( !couponSettingsPage ){
            return null
        }
    
        if( !route ){
            return null
        }
    
        if( !route.active ){
            return null
        }
    
        return {
            ...JSON.parse( JSON.stringify(couponSettingsPage) ) ,
            route: JSON.parse( JSON.stringify(route) ) ,
        }
    } catch ( error ) {
        await db.disconnect()
        console.log(error)
        return null
    }
}