import { Router } from "express";
import { UserController } from "../controllers/user";
import { UserValidator } from "../validators/user";
import auth from "../middleware/auth";

const router = Router({ mergeParams: true }),
	controller = new UserController(),
	validator = new UserValidator();

router.route("/all").get(auth, controller.getAll);
router.route("/create").post(validator.create, controller.create);
router.route("/login").post(validator.login, controller.login);
router.route("/update").patch(auth, validator.update, controller.update);
router.route("/delete").patch(auth, controller.delete);
router.route("/:id").get(auth, controller.get);

export default router;
