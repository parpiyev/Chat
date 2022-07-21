import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export class RoomValidator {
	private createSchema = Joi.object({
		users: Joi.array().items(Joi.string().required()).required()
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.createSchema.validate(req.body);
		if (error) throw error;

		next();
	});
}
