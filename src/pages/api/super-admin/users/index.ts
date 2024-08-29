import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery } from 'mongoose'
import { db } from '@/database'
import { User } from '@/models'
import { USERS_PAGE_SIZE } from '@/constants'
import { IUser, IUsersResp } from '@/interfaces'

type Data =
    | { msg: string }
    | IUsersResp
    | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':
            return getUsers(req, res)

        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const pageSize = USERS_PAGE_SIZE;
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { page=1, count = pageSize } = req.query

    let skip = Number(page) - 1
    let limit = Number(count)

    if (skip < 0) { skip = 0 }
    if (limit < 0) { limit = pageSize }

    skip = skip * limit

    let query:FilterQuery<IUser> = { 
        status: true
    }

    try {
        await db.connect()
        const [users, total] = await Promise.all([
            User.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: 'desc'})
                .select('-status -updatedAt -status')
                .lean(),
            User.countDocuments(query)
        ])
        await db.disconnect()

        return res.status(200).json({
            currentPage: Number(page),
            totalPages : Math.ceil( total / Number(count) ),
            pageSize   : users.length,
            totalUsers : total,
            users
        })

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }
}
