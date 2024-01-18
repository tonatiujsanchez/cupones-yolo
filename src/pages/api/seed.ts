// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  
    if( process.env.NODE_ENV === 'production' ){
        return res.status(401).json({ msg: 'Not authorized' })
    }

    return res.status(200).json({ msg: 'ok!' })
}

