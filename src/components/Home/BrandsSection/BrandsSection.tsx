import Image from 'next/image'
import styles from './BrandsSection.module.scss'

export const BrandsSection = () => {
    return (
        <section className={ styles['brands-container'] }>
            <h2 className={ styles['brands-title'] }>Pedidos de</h2>
            <div className={`container ${styles['brands-content']}`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/brands/yuya.png`}
                    alt="Yuya"
                    title="Yuya"
                    width={300}
                    height={100}
                    className={ styles['brands-logo'] }
                />
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/brands/shein.svg`}
                    alt="SHEIN"
                    title="SHEIN"
                    width={200}
                    height={100}
                    className={ styles['brands-logo'] }
                />
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/brands/cuidado-con-el-perro.svg`}
                    alt="Cuidado con el perro"
                    title="Cuidado con el perro"
                    width={200}
                    height={100}
                    className={ styles['brands-logo'] }
                />
            </div>
        </section>
    )
}
