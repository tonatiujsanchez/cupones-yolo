import { FC } from 'react'
import { ICouponLite } from '@/interfaces'

interface Props {
    onSubmit: ( coupon:ICouponLite )=> void
}
export const CouponAddForm:FC<Props> = ({ onSubmit }) => {
    return (
        <div>CouponAddForm</div>
    )
}
