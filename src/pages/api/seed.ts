// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Route } from '@/models'

type Data = {
    msg: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  
    if( process.env.NODE_ENV === 'production' ){
        return res.status(401).json({ msg: 'Not authorized' })
    }

    await  db.connect()
    const newRoute = new Route({
        title: 'Cupones',
        slug : 'cupones',
    })
    await newRoute.save()
    await db.disconnect()

    return res.status(200).json({ msg: 'ok!' })
}

