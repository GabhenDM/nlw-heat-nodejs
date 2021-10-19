import { redisClient } from "../app";
import prismaClient from "../prisma";

class ProfileUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })
        redisClient.setex(user_id + "_profile", 1440, JSON.stringify(user));
        return user;
    }
}

export { ProfileUserService }