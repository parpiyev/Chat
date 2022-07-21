import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { storage } from "../storage/main";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { signToken } from "../middleware/auth";
import { IUser } from "../models/User";

export class UserController {
	getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const users = await storage.user.find(req.query);

		res.status(200).json({
			success: true,
			data: {
				users
			}
		});
	});

	get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const user = await storage.user.findOne({ _id: req.params.id });

		res.status(200).json({
			success: true,
			data: {
				user
			}
		});
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let user = await storage.user.findOne({ phoneNumber: req.body.phoneNumber });

		if (user) throw new AppError(400, "Bu telefon raqami mavjud!");

		const salt = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(req.body.password, salt);

		user = await storage.user.create(req.body);

		res.status(201).json({
			success: true,
			data: {
				token: await signToken({ id: user.id }),
				user
			}
		});
	});

	login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { phoneNumber, password, firebaseToken } = req.body;
		let user = await storage.user.findOne({ phoneNumber });

		const check_password = await bcrypt.compare(password, user?.password);

		if (!user || !check_password) {
			throw new AppError(
				400,
				"Parol yoki telefon raqamni notoʻgʻri. Tekshirib qayta urunib koʻring!"
			);
		}

		if (firebaseToken) {
			user.firebaseTokens.push(firebaseToken);
			user = await storage.user.update(user.id, {
				firebaseTokens: user.firebaseTokens
			} as IUser);
		}

		res.status(201).json({
			success: true,
			data: {
				token: await signToken({ id: user.id }),
				user
			}
		});
	});

	update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { type, firebaseToken } = req.body,
			{ id } = res.locals;

		let user = await storage.user.findOne({ _id: id });

		if (type === "add") {
			user.firebaseTokens.push(firebaseToken);
			user = await storage.user.update({ _id: id }, user);
		} else if (type === "remove") {
			user.firebaseTokens = user.firebaseTokens.filter((token) => token !== firebaseToken);
			user = await storage.user.update({ _id: id }, user);
		}

		res.status(200).json({
			success: true,
			data: {
				user
			}
		});
	});

	delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		await storage.user.delete({ _id: res.locals.id });

		res.status(204).json({
			success: true,
			data: null
		});
	});
}
