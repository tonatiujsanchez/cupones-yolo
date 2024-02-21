import { FC, ReactNode } from 'react'
import styles from './TablePrimary.module.scss'


type TablePrimaryProps = {
    children: ReactNode;
    className?: string
};

type TableHeadProps = {
    children: ReactNode;
};

type TableRowProps = {
    children: ReactNode;
};


const TablePrimary:FC<
    TablePrimaryProps> & 
    { THead: FC<TableHeadProps> } &
    { TRow: FC<TableRowProps
> } = ({ children, className, ...props }) => {
    return (
        <div className={`custom-scroll ${ styles['table-container'] } ${ className }`}>
            <table { ...props } className={`${ styles['table'] } `}>
                { children }
            </table>
        </div>
    )
}
 
const THead:FC<TableHeadProps> = ({ children, ...props }) => (
    <thead { ...props } className={ styles['table__thead'] }>
        {children}
    </thead>
)

const TRow:FC<TableRowProps> = ({ children }) =>( 
    <tr className={ styles['table-row'] }>
        { children }
    </tr> 
)

TablePrimary.THead = THead
TablePrimary.TRow = TRow

export {
    TablePrimary
}
