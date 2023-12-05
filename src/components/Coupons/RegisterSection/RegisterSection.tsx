import { Pagination, RegisterList } from '@/components'
import { useGetClients } from '@/hooks'
import styles from './RegisterSection.module.scss'
import { CLIENTS_PAGE_SIZE } from '@/constants'

export const RegisterSection = () => {

    const { clientsQuery, handlePageClick } = useGetClients({ page: 1 })

    console.log( clientsQuery.data )

    return (
        <section className={ styles['register-section'] }>
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
