import {Request, Response} from "express";
import Logger from "../config/logger";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
    async handle(req: Request,res: Response) {
        const { code } = req.body;
        const service = new AuthenticateUserService();
        try {            
            const response = await service.execute(code);
            return res.json(response)
        } catch(err) {
            Logger.error("Error Authenticating User")
            return res.status(401).json({ error: err.message});
        }
    }
}


export {AuthenticateUserController}