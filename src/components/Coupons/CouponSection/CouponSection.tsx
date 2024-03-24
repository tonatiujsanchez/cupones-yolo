import { useState } from 'react'
import { useGetCoupons } from '@/hooks'
import { CouponList, CouponsSectionFilter, ErrorMessage, Pagination, RegisterCount } from '@/components'
import { COUPONS_PAGE_SIZE, STATUS_OPTIONS_COUPON_EXCHANGE } from '@/constants'
import { ISelectOption, IStatusCouponExchange, IStatusCouponExchangeOptions } from '@/interfaces'

import styles from './CouponSection.module.scss'


export const CouponSection = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [statusCouponExchange, setStatusCouponExchange] = useState<IStatusCouponExchange>(STATUS_OPTIONS_COUPON_EXCHANGE[0])


    const { couponsQuery, handlePageClick } = useGetCoupons({
        page : 1, 
        searchTerm,
        exchangeStatus: statusCouponExchange.value
    })

    const handleSetSearchTerm = ( searchTerm: string ) => {
        setSearchTerm( searchTerm )
    }

    const handleSetStatusCouponExchange = ( value:ISelectOption ) => {
        setStatusCouponExchange({
            label: value.label,
            value : value.value as IStatusCouponExchangeOptions
        })
    }

    return (
        <section className={ styles['coupon-section'] }>
            <CouponsSectionFilter
                handleSetSearchTerm={ handleSetSearchTerm }
                statusOptionsCouponExchange={ STATUS_OPTIONS_COUPON_EXCHANGE }
                statusCouponExchange={ statusCouponExchange }
                handleSetStatusCouponExchange={ handleSetStatusCouponExchange }
            />
            {
                couponsQuery.isLoading && (
                    <div className={ styles['loader-container'] }>
                        <span className="loader-cube"></span>
                    </div>
                )
            }
            {
                couponsQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar los cupones"
                    />
                )
            }
            {
                !couponsQuery.isLoading && couponsQuery.data && (
                    <>
                        <CouponList 
                            coupons={ couponsQuery.data.coupons }
                            currentPage={ couponsQuery.data.currentPage }
                        />
                        <div className={ styles['pagination-container'] }>
                            <Pagination
                                currentPage={ couponsQuery.data.currentPage }
                                onPageChange={ handlePageClick }
                                pageCount={ couponsQuery.data.totalPages }
                            />
                            <RegisterCount
                                pageSize={ COUPONS_PAGE_SIZE }
                                currentPage={ couponsQuery.data.currentPage }
                                currentPageSize={ couponsQuery.data.pageSize }
                                totalClientes={ couponsQuery.data.totalCoupons }
                            />
                        </div>
                    </>
                )
            }
        </section>
    )
}
