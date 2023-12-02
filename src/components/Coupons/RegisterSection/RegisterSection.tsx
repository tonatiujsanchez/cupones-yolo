import { RegisterList } from '@/components'
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

    return (
        <section>
            <RegisterList clients={ clientsQuery.data } />
        </section>
    )
}
