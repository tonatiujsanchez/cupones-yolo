import { FC, ReactNode } from 'react'
import { Overlay } from '@/components'
import styles from './ModalContainer.module.scss'


interface Props {
    children : ReactNode
    show     : boolean
    onHidden?: ()=>void
}
export const ModalContainer:FC<Props> = ({ children, show, onHidden }) => {

    if( !show ){
        return <></>
    }
    
    return (
        <div className={ styles['modal-container'] }>
            <Overlay onClick={ onHidden } />
            <div className={ styles['modal-content'] }>
                { children }
            </div>
        </div>
    )
}
