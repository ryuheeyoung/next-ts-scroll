import { NextApiRequest, NextApiResponse } from "next";
import { makeDatas } from "utils/users";


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {page, size} = req.query;
        const data = makeDatas(+page || 1, +size || 10);

        res.status(200).json(data);

    } catch (e: any ) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }

};

export default handler;
