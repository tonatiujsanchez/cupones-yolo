import { FC } from "react"
import ReactPaginate from "react-paginate"

import styles from './Pagination.module.scss'
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons"

interface Props {
    currentPage : number
    onPageChange: ( selectedPage: number ) => void
    pageCount   : number
}
export const Pagination:FC<Props> = ({ currentPage, onPageChange, pageCount }) => {

    if( pageCount <= 1 ){
       return ( <></> ) 
    }
    return (
        <ReactPaginate
            forcePage={ currentPage - 1 }
            breakLabel="..."
            nextLabel={ <ChevronRightIcon /> }
            onPageChange={ ( event )=> onPageChange( event.selected + 1 ) }
            pageRangeDisplayed={1}
            pageCount={ pageCount }
            previousLabel={ <ChevronLeftIcon /> }
            activeLinkClassName={ styles['page-active'] }
            className={ styles['pagination'] }
        />
    )
}
