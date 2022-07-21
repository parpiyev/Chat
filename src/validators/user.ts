import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export class UserValidator {
	private createSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		firebaseTokens: Joi.array().items(Joi.string().required()),
		phoneNumber: Joi.number().required(),
		password: Joi.string().required()
	});

	private updateSchema = Joi.object({
		type: Joi.string().valid("add", "remove").required(),
		firebaseToken: Joi.string().required()
	});

	private loginSchema = Joi.object({
		phoneNumber: Joi.number().required(),
		password: Joi.string().required()
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.createSchema.validate(req.body);
		if (error) throw error;

		next();
	});

	update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.updateSchema.validate(req.body);
		if (error) throw error;

		next();
	});

	login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.loginSchema.validate(req.body);
		if (error) throw error;

		next();
	});
}
