import { FC, ReactNode, useEffect } from 'react'
import styles from './ModalContainer.module.scss'


interface Props {
    children : ReactNode
    show     : boolean
    onHidden?: ()=>void
}
export const ModalContainer:FC<Props> = ({ children, show, onHidden=()=>{} }) => {

    useEffect(() => {
        const body = document.querySelector('body')
        body!.classList.add('fixed-body')
    
      return () => {
        body!.classList.remove('fixed-body')
      }
    }, [])


    if( !show ){
        return <></>
    }
    
    return (
        <div className={ styles['modal-container'] }>
            <div className="overlay" onClick={ onHidden }></div>
            <div className={ styles['modal-content'] }>
                { children }
            </div>
        </div>
    )
}
