import { Pagination, RegisterList } from '@/components'
import { useGetClients } from '@/hooks'
import styles from './RegisterSection.module.scss'

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
                        </div>
                    </>
                )
            }

        </section>
    )
}
