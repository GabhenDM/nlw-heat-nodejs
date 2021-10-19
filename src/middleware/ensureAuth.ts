import { Request, Response, NextFunction } from "express";
import { verify} from "jsonwebtoken"
import Logger from "../config/logger";


interface IPayload {
    sub: string
}
export function ensureAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({error: "token.invalid"});
    }

    const [,token] = authToken.split(" ");

    try {
        const {sub} = verify(token, process.env.JWT_SECRET) as IPayload

        req.user_id = sub;

        return next()
        
    } catch(err){
        Logger.error("Error validating token")
        return res.status(401).json({error: "token.error.verify"})
    }
}