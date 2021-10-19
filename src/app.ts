import "dotenv/config"
import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
import promBundle from "express-prom-bundle"


import {router} from "./routes"
import morganMiddleware from './config/morgan'
import Logger from "./config/logger";
import { RedisClient } from "redis";


const app = express();
app.use(cors())

const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    customLabels: {project_name: 'nlw-heat', project_type: 'test_metrics_labels'},
    promClient: {
        collectDefaultMetrics: {
        }
      }
});

app.use(metricsMiddleware)


const redisClient = new RedisClient({host: process.env.REDIS_HOST,password: process.env.REDIS_PASSWORD});

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, { 
    cors: {
        origin: "*"
    }
});
io.on("connection", socket => { 
    Logger.debug(`Socket connected - ${socket.id}`);
})





app.use(express.json())
app.use(morganMiddleware)
app.use(router);


app.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (req,res) => {
    const { code } = req.query;

    return res.json(code);
})

app.get("/healthcheck", (req,res) => {
    res.status(200).json("WORKING");
})

export { serverHttp, io, redisClient};