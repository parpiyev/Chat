import multer from "../middleware/multer";
import { Router } from "express";
import { ChatController } from "../controllers/chat";
import { ChatValidator } from "../validators/chat";
import auth from "../middleware/auth";

const router = Router({ mergeParams: true }),
	controller = new ChatController(),
	validator = new ChatValidator(),
	upload = multer().single("file");

router.route("/create").post(auth, upload, validator.create, controller.create);

router.route("/:id").get(auth, controller.get).patch(auth, validator.update, controller.update);

export default router;
