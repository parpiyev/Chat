import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export class ChatValidator {
	private createSchema = Joi.object({
		text: Joi.string(),
		room: Joi.string().required(),
		toUser: Joi.string().required()
	});

	private updateSchema = Joi.object({
		isRead: Joi.boolean().valid(true).required()
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
}
