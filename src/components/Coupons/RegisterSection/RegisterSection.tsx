import { useState } from 'react'
import { useGetClients } from '@/hooks'
import { Pagination, RegisterList, RegisterCount, ErrorMessage, RegistersSectionFilter } from '@/components'
import { CLIENTS_PAGE_SIZE, OPTIONS_COUPONS_SENT_OF_CLIENT, MONTHS } from '@/constants'
import { getYears } from '@/utils'

import { ICouponsSent, ICouponsSentOptions, ISelectOption } from '@/interfaces'
import styles from './RegisterSection.module.scss'

const MONTHS_OPTIONS = [{ value: '', label: 'Todos' }, ...MONTHS ]
const YEARS = [{ value: '', label: 'Todos' }, ...getYears(2)]

export const RegisterSection = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [couponsSent, setCouponsSent] = useState<ICouponsSent>( OPTIONS_COUPONS_SENT_OF_CLIENT[0] )
    const [month, setMonth] = useState<ISelectOption>( MONTHS_OPTIONS[0] )
    const [year, setYear] = useState<ISelectOption>(YEARS[0])

    const { clientsQuery, handlePageClick } = useGetClients({
        page : 1, 
        searchTerm, 
        couponsSent:couponsSent.value, 
        month: month.value, 
        year : year.value 
    })
    

    const handleSetSearchTerm = ( searchTerm: string ) => {
        setSearchTerm( searchTerm )
    }
    
    const handleSetCouponsSent = ( value:ISelectOption ) => {
        setCouponsSent({
            label: value.label,
            value : value.value as ICouponsSentOptions
        })
    }

    const handleSetMonth = (value:ISelectOption ) => {
        setMonth(value)
    }

    const handleSetYear = (value:ISelectOption ) => {
        setYear(value)
    }

    return (
        <section className={ styles['register-section'] }>
            <RegistersSectionFilter
                handleSetSearchTerm={ handleSetSearchTerm }
                optionsCouponsSent={ OPTIONS_COUPONS_SENT_OF_CLIENT }
                couponsSent={ couponsSent }
                handleSetCouponsSent={ handleSetCouponsSent }
                monthOptions={ MONTHS_OPTIONS }
                month={ month }
                handleSetMonth={ handleSetMonth }
                yearOptions={ YEARS }
                year={ year }
                handleSetYear={ handleSetYear }
            />
            {
                clientsQuery.isLoading && (
                    <div className={ styles['loader-container'] }>
                        <span className="loader-cube"></span>
                    </div>
                )
            }
            {
                clientsQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar los registros"
                    />
                )
            }
            {
                !clientsQuery.isLoading && clientsQuery.data && (
                    <>
                        <RegisterList 
                            clients={ clientsQuery.data.clients }
                            currentPage={ clientsQuery.data.currentPage }
                            searchTerm={ searchTerm }
                            couponsSent={ couponsSent.value }
                            month={ month.value }
                            year={ year.value }
                        />
                        <div className={ styles['pagination-container'] }>
                            <Pagination
                                currentPage={ clientsQuery.data.currentPage }
                                onPageChange={ handlePageClick }
                                pageCount={ clientsQuery.data.totalPages }
                            />
                            <RegisterCount
                                pageSize={ CLIENTS_PAGE_SIZE }
                                currentPage={ clientsQuery.data.currentPage }
                                currentPageSize={ clientsQuery.data.pageSize }
                                totalClientes={ clientsQuery.data.totalClientes }
                            />
                        </div>
                    </>
                )
            }
        </section>
    )
}
