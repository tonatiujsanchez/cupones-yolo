import { FC } from 'react'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { ISideLink } from '@/interfaces'
import styles from './SideLink.module.scss'
import { ChevronDownIcon } from '@/components/Icons'

interface Props {
    sideLink: ISideLink
}
export const SideLink:FC<Props> = ({ sideLink }) => {

    const pathname = usePathname()
    const isSelectedLink = sideLink.path.split('/')[2] === pathname.split('/')[2]

    return (
        <li className={ styles['sidelink-item'] }>
            <NextLink
                href={sideLink.path}
                className={`${styles['sidelink']} ${(sideLink.path === pathname || isSelectedLink) && styles['link-active']}`}
            >
                <div className={styles['sidelink-content']}>
                    {sideLink.icon}
                    <span>{sideLink.label}</span>
                    <span className={ styles['sidelink-icon'] }>
                        { sideLink.subLinks && sideLink.subLinks.length > 0 && <ChevronDownIcon />}
                    </span>
                </div>
            </NextLink>
            {
                sideLink.subLinks && sideLink.subLinks.length > 0 && (
                    <ul className={styles['siderbar-sublist']}>
                        {
                            sideLink.subLinks.map(subItem => (
                                <li key={subItem.path}>
                                    <NextLink
                                        href={subItem.path}
                                        className={`${styles['siderbar-sublist__sidelink']} ${subItem.path === pathname && styles['link-active']}`}
                                    >
                                        {subItem.icon}
                                        <span>{subItem.label}</span>
                                    </NextLink>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </li>
    )
}
