import Image from 'next/image'
import styles from './HeroSection.module.scss'


export const HeroSection = () => {
    return (
        <section className={ styles['hero-content-section'] }>
            <div className={`${ styles['hero-content'] }`}>
                <div className={styles['hero-left']}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`}
                        alt="YoloStyle"
                        title="Logo de Yolostyle"
                        width={100}
                        height={40}
                        className={styles.logo}
                    />
                    <div className={styles.title}>
                        <h1>
                            <span>Encuentra</span>
                            <span>tu estilo</span>
                        </h1>
                    </div>
                </div>
                <div className={styles['hero-right']}>

                </div>
                <div className={styles['image-center']}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/women.webp`}
                        alt="YoloStyle"
                        title="Yolostyle"
                        width={720}
                        height={960}
                    />
                    <p className={`${styles['image-center-text']} ${ styles['text-one'] }`}>Ropa</p>
                    <p className={`${styles['image-center-text']} ${ styles['text-two'] }`}>Calzado</p>
                    <p className={`${styles['image-center-text']} ${ styles['text-three'] }`}>Accesorios</p>
                    <p className={`${styles['image-center-text']} ${ styles['text-four'] }`}>Cosméticos</p>
                    <p className={`${styles['image-center-text']} ${ styles['text-five'] }`}>Y más...</p>
                </div>
            </div>
        </section>
    )
}
