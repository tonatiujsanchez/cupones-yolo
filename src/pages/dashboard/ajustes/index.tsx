import { DashboardLayout, SettingsListSection } from '@/components'
import styles from './Settings.module.scss'

const SettingsPage = () => {
  return (
    <DashboardLayout headding="Ajustes">
        <div className={ styles['settings'] }>
            
            <SettingsListSection 
                title={'Categorias'}
                sectionSelected={ 'categories' }
            />
            <SettingsListSection 
                title={'Tipos'}
                sectionSelected={ 'types' }
            />
            <SettingsListSection 
                title={'Tallas'}
                sectionSelected={ 'sizes' }
            />
        </div>
    </DashboardLayout>
  )
}

export default SettingsPage