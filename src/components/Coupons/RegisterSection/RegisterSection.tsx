import { useState } from 'react'
import { useGetClients } from '@/hooks'
import { Pagination, RegisterList, SearchForm, CustomSelect } from '@/components'
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

    return (
        <section className={ styles['register-section'] }>
            <div className={ styles['register-filter__container'] }>
                <div className={`${ styles['register-filter__field'] } ${ styles['register-filter__input-search'] }`}>
                    <label htmlFor="">Buscar por nombre</label>
                    <SearchForm
                        onSubmit={ handleSetSearchTerm }
                        placeholder="Nombre del cliente"
                    />
                </div>
                <div className={`${ styles['register-filter__field'] } ${styles['register-filter__select']}`}>
                    <label htmlFor="">Estado</label>
                    <CustomSelect
                        options={ OPTIONS_COUPONS_SENT_OF_CLIENT }
                        value={ couponsSent }
                        onChange={ handleSetCouponsSent }
                    />
                </div>
                <div className={`${ styles['register-filter__field'] } ${styles['register-filter__select']}`}>
                    <label htmlFor="">Mes</label>
                    <CustomSelect
                        options={ MONTHS_OPTIONS }
                        value={ month }
                        onChange={ setMonth }
                    />
                </div>
                <div className={`${ styles['register-filter__field'] } ${styles['register-filter__select']}`}>
                    <label htmlFor="">Año</label>
                    <CustomSelect
                        options={ YEARS }
                        value={ year }
                        onChange={ setYear }
                    />
                </div>
            </div>
            {
                clientsQuery.isLoading && (
                    <div className={ styles['loader-container'] }>
                        <span className="loader-cube"></span>
                    </div>
                )
            }
            {
                !clientsQuery.isLoading && !clientsQuery.data && (
                    <div>
                        <p>No hay clientes registrados</p>
                    </div>
                )
            }
            {
                !clientsQuery.isLoading && clientsQuery.data && (
                    <>
                        <RegisterList 
                            clients={ clientsQuery.data.clients }
                            currentPage={ clientsQuery.data.currentPage }
                            searchTerm={ searchTerm }
                        />
                        <div className={ styles['pagination-container'] }>
                            <Pagination
                                currentPage={ clientsQuery.data.currentPage }
                                onPageChange={ handlePageClick }
                                pageCount={ clientsQuery.data.totalPages }
                            />
                            
                            <p className={ styles['register-count'] }>
                                <span>{ CLIENTS_PAGE_SIZE * ( clientsQuery.data.currentPage - 1 ) + 1 }</span> 
                                - <span>{ CLIENTS_PAGE_SIZE * (clientsQuery.data.currentPage - 1) + clientsQuery.data.pageSize  }</span>
                                de <span>{ clientsQuery.data.totalClientes }</span> registros
                            </p>
                        </div>
                    </>
                )
            }

        </section>
    )
}
