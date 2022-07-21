import { Router } from "express";
import { RoomController } from "../controllers/room";
import { RoomValidator } from "../validators/room";
import auth from "../middleware/auth";

const router = Router({ mergeParams: true }),
	controller = new RoomController(),
	validator = new RoomValidator();

router.route("/all").get(auth, controller.getAll);
router.route("/create").post(auth, validator.create, controller.create);

router.route("/:id").delete(auth, controller.delete);

export default router;
