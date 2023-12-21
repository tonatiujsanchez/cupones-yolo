import { FC } from 'react'
import { CustomSelect, SearchForm } from '@/components'

import { ISelectOption, IStatusCouponExchange } from '@/interfaces'
import styles from './CouponsSectionFilter.module.scss'


interface Props {
    handleSetSearchTerm          : ( searchTerm: string )=> void
    statusOptionsCouponExchange  : IStatusCouponExchange[]
    statusCouponExchange         : IStatusCouponExchange
    handleSetStatusCouponExchange: ( value: ISelectOption ) => void
}
export const CouponsSectionFilter:FC<Props> = ({ handleSetSearchTerm, statusOptionsCouponExchange, statusCouponExchange, handleSetStatusCouponExchange }) => {
    return (
        <div className={styles['coupon-filter__container']}>
            <div className={`${styles['coupon-filter__field']} ${styles['coupon-filter__input-search']}`}>
                <label 
                    className={styles['coupon-filter__field-label']} 
                    htmlFor="search"
                >
                    Buscar cupón
                </label>
                <SearchForm
                    fieldName="search"
                    onSubmit={handleSetSearchTerm}
                    placeholder="Folio o nombre del cliente"
                />
            </div>
            <div className={`${styles['coupon-filter__field']} ${styles['coupon-filter__select']}`}>
                <p className={styles['coupon-filter__field-label']}>Estado</p>
                <CustomSelect
                    options={statusOptionsCouponExchange}
                    value={ statusCouponExchange }
                    onChange={ handleSetStatusCouponExchange }
                />
            </div>
        </div>
    )
}
