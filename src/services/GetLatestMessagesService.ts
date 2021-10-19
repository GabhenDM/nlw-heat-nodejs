import { redisClient } from "../app";
import prismaClient from "../prisma";

class GetLatestMessagesService {
    async execute(user_id: string) {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true
            }
        })
         // 🔃 update redis with the new user 🔃
        redisClient.setex(user_id, 1440, JSON.stringify(messages));
        return messages;
    }
}

export { GetLatestMessagesService }