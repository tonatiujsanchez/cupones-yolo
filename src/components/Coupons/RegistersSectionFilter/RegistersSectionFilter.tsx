import { FC } from 'react'
import { CustomSelect, SearchForm } from '@/components'

import { ICouponsSent, ISelectOption } from '@/interfaces'
import styles from './RegistersSectionFilter.module.scss'


interface Props {
    handleSetSearchTerm : ( searchTerm: string )=> void
    optionsCouponsSent  : ICouponsSent[]
    couponsSent         : ICouponsSent
    handleSetCouponsSent: ( value:ISelectOption ) => void
    monthOptions        : ISelectOption[]
    month               : ISelectOption
    handleSetMonth      : ( value:ISelectOption ) => void
    yearOptions         : ISelectOption[]
    year                : ISelectOption
    handleSetYear       : ( value:ISelectOption ) => void
}
export const RegistersSectionFilter:FC<Props> = ({ 
    handleSetSearchTerm,
    optionsCouponsSent,
    couponsSent,
    handleSetCouponsSent,
    monthOptions,
    month,
    handleSetMonth,
    yearOptions,
    year,
    handleSetYear
}) => {
    return (
        <div className={styles['register-filter__container']}>
            <div className={`${styles['register-filter__field']} ${styles['register-filter__input-search']}`}>
                <label className={styles['register-filter__field-label']} htmlFor="search">Buscar por nombre</label>
                <SearchForm
                    fieldName="search"
                    onSubmit={handleSetSearchTerm}
                    placeholder="Nombre del cliente"
                />
            </div>
            <div className={`${styles['register-filter__field']} ${styles['register-filter__select']}`}>
                <p className={styles['register-filter__field-label']}>Estado</p>
                <CustomSelect
                    options={optionsCouponsSent}
                    value={couponsSent}
                    onChange={handleSetCouponsSent}
                />
            </div>
            <div className={`${styles['register-filter__field']} ${styles['register-filter__select']}`}>
                <p className={styles['register-filter__field-label']}>Mes de nacimiento</p>
                <CustomSelect
                    options={monthOptions}
                    value={month}
                    onChange={handleSetMonth}
                />
            </div>
            <div className={`${styles['register-filter__field']} ${styles['register-filter__select']}`}>
                <p className={styles['register-filter__field-label']}>Año de registro</p>
                <CustomSelect
                    options={yearOptions}
                    value={year}
                    onChange={handleSetYear}
                />
            </div>
        </div>
    )
}
