import {Request, Response} from "express";
import Logger from "../config/logger";
import { ProfileUserService} from "../services/ProfileUserService";

class GetUserProfileController {
    async handle(req: Request,res: Response) {
        const service = new ProfileUserService();
        try {
            const result = await service.execute(req.user_id);
            return res.json(result);

        } catch (err){
            Logger.error(err.message);
            return res.status(500).json({error: err.message})
        }

    }
}


export {GetUserProfileController}