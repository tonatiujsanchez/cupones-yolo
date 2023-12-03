import { FC } from "react"
import ReactPaginate from "react-paginate"

import styles from './Pagination.module.scss'

interface Props {
    currentPage : number
    onPageChange: ( selectedPage: number ) => void
    pageCount   : number
}
export const Pagination:FC<Props> = ({ currentPage, onPageChange, pageCount }) => {
    return (
        <ReactPaginate
            forcePage={ currentPage - 1 }
            breakLabel="..."
            nextLabel="Siguiente >"
            onPageChange={ ( event )=> onPageChange( event.selected + 1 ) }
            pageRangeDisplayed={1}
            pageCount={ 10 }
            previousLabel="< Anterior"
            activeLinkClassName={ styles['page-active'] }
            className={ styles['pagination'] }
        />
    )
}
