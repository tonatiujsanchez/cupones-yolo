
import { useGetCoupons } from '@/hooks'
import { CouponList, ErrorMessage, Pagination, RegisterCount } from '@/components'
import { COUPONS_PAGE_SIZE } from '@/constants'

import styles from './CouponSection.module.scss'


export const CouponSection = () => {

    const { couponsQuery, handlePageClick } = useGetCoupons({
        page : 1, 
    })

    return (
        <section className={ styles['coupon-section'] }>
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
