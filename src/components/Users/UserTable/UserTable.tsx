import { FC } from 'react'
import { Avatar, CustomSelect, MessageWithoutResults, TablePrimary } from '@/components'
import { USER_ROLES, USER_ROLES_OPTIONS, USERS_PAGE_SIZE } from '@/constants'
import { ISelectOption, IUser } from '@/interfaces'

import styles from './UserTable.module.scss'

interface Props {
    users: IUser[]
    currentPage: number
    searchTerm: string
}
export const UserTable: FC<Props> = ({ users, currentPage, searchTerm }) => {

    

    const changeUserRole = (value: ISelectOption) => {
        console.log(value)
        
    }

    return (
        users.length === 0
            ? (
                <MessageWithoutResults />
            ) : (
                <TablePrimary className="user-table">
                    <TablePrimary.THead>
                        <TablePrimary.TRow>
                            <th>#</th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Role</th>
                        </TablePrimary.TRow>

                    </TablePrimary.THead>
                    <tbody>
                        {
                            users.map((user, idx) => {
                                const index = (USERS_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
                                return (
                                    <TablePrimary.TRow key={user._id}>
                                        <td className={styles['user-index']}>{index}</td>
                                        <td className={styles['user-photo']}>
                                            <Avatar
                                                photo={user.photo}
                                                name={user.name}
                                            />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.confirmed ? 'Confirmado' : 'Sin Confirmar'}</td>
                                        <td>
                                            <CustomSelect
                                                options={USER_ROLES_OPTIONS}
                                                value={USER_ROLES_OPTIONS.find(role => role.value === user.role)!}
                                                onChange={changeUserRole}
                                            />
                                        </td>
                                    </TablePrimary.TRow>
                                )
                            })
                        }
                    </tbody>
                </TablePrimary>
            )
    )
}
