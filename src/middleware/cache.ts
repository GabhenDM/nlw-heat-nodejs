import { NextFunction, Request, Response } from "express";
import {RedisClient} from "redis"
import Logger from "../config/logger";

const portRedis = process.env.PORT_REDIS || '6379';

const redisClient = new RedisClient({host: process.env.REDIS_HOST,password: process.env.REDIS_PASSWORD});

const isCached = (req: Request, res: Response, next: NextFunction) => {
    const user_id  = req.user_id;
  
    // getting our data by key (id)
    redisClient.get(user_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      if (data != null) {
        Logger.debug(`Cache hit! - ${user_id}`)
        res.status(200).json(JSON.parse(data));
      } else {
        Logger.debug(`Cache miss! - ${user_id}`)
        next();
      }
    });
  };
  export default isCached;