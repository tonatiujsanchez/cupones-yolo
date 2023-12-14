import { FC } from 'react'
import styles from './RegisterCount.module.scss'

interface Props {
    pageSize       : number
    totalClientes  : number
    currentPage    : number
    currentPageSize: number
}

export const RegisterCount:FC<Props> = ({ pageSize, totalClientes, currentPage, currentPageSize }) => {


    if(totalClientes <= 0){
        return <></>
    }

    return (
        <p className={ styles['register-count'] }>
            <span>{ pageSize * ( currentPage - 1 ) + 1 }</span> 
            - <span>{ pageSize * ( currentPage - 1) + currentPageSize  }</span>
            de <span>{ totalClientes }</span> registros
        </p>
    )
}
