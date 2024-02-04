import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return res.status(401).json({ msg: 'Not authorized' })
}