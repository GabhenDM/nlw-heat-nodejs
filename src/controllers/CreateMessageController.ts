import {Request, Response} from "express";
import Logger from "../config/logger";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
    async handle(req: Request,res: Response) {
        const { message } = req.body;
        const service = new CreateMessageService();
        try {            
            const response = await service.execute(message,req.user_id);

            return res.json(response)
        } catch(err) {
            Logger.error("Error Creating message");
            return res.status(500).json({ error: err.message});
        }
    }
}


export {CreateMessageController}