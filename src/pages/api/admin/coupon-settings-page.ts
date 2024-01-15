import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
 
    switch (req.method) {
        case 'PUT':
            return updateCouponSettingsPage( req, res )
    
        default:
            break;
    }

}

const updateCouponSettingsPage = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {  } = req.query

    

}
