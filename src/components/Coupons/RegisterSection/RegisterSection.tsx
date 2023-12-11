import { useState } from 'react'
import { useGetClients } from '@/hooks'
import { Pagination, RegisterList, SearchForm, CustomSelect } from '@/components'
import { CLIENTS_PAGE_SIZE } from '@/constants'

import { ISelectOption } from '@/interfaces'
import styles from './RegisterSection.module.scss'

export const RegisterSection = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')

    const { clientsQuery, handlePageClick } = useGetClients({ page: 1, searchTerm })


    const handleSetSearchTerm = ( searchTerm: string ) => {
        setSearchTerm( searchTerm )
    }

    const handleSetCouponsSent = ( optionSelected:ISelectOption ) => {
        console.log( optionSelected )
    }

    return (
        <section className={ styles['register-section'] }>
            <div className={ styles['register-filter__container'] }>
                <SearchForm
                    onSubmit={ handleSetSearchTerm }
                />
                <div className={ styles['register-filter__select-coupons-sent'] }>
                    <CustomSelect
                        options={[
                            {
                                value:"",
                                label:"Todos"
                            },
                            {
                                value:"enviados",
                                label:"Enviados"
                            },
                            {
                                value:"pendientes",
                                label:"Pendientes"
                            },
                        ]}
                        onChange={ handleSetCouponsSent }
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
