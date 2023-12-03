import { Pagination, RegisterList } from '@/components'
import { useGetClients } from '@/hooks'
import styles from './RegisterSection.module.scss'

export const RegisterSection = () => {

    const { clientsQuery } = useGetClients({ page: 1 })

    if( clientsQuery.isLoading ) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    }

    if( !clientsQuery.data ) {
        return (
            <div>
                <p>No hay registros</p>
            </div>
        )
    }

    const handlePageClick = ( page: number ) => {
        console.log( page )
    }

    console.log( clientsQuery.data )

    return (
        <section>
            <div>
                <RegisterList clients={ clientsQuery.data.clients } />
            </div>
            <div>
                <Pagination
                    currentPage={ clientsQuery.data.currentPage }
                    onPageChange={ handlePageClick }
                    pageCount={ clientsQuery.data.totalPages }
                />
            </div>
        </section>
    )
}
