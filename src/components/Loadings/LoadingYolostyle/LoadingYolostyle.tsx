import styles from './LoadingYolostyle.module.scss'
import Image from 'next/image';

export const LoadingYolostyle = () => {
    return (
        <div className={ styles['loading'] }>
             <span className="loader-cube"></span>
             <Image
                alt='Cargando Yolostyle'
                title='Yolostyle'
                width={150}
                height={50}
                src={`/images/logo.svg`}
                className={ styles['loading-logo'] }
             />
        </div>
    )
}
