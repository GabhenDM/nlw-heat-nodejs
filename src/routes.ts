import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLatestMessagesController } from "./controllers/GetLatestMessagesController";
import { GetUserProfileController } from "./controllers/GetUserProfileController";
import { ensureAuth } from "./middleware/ensureAuth";
import cache from "./middleware/cache";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuth,  new CreateMessageController().handle)
router.get("/messages/latest", ensureAuth, cache, new GetLatestMessagesController().handle)
router.get("/user/profile", ensureAuth, cache, new GetUserProfileController().handle)

export {router}