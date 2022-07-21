import { NextFunction, Request, Response } from "express";
import { storage } from "../storage/main";
import catchAsync from "../utils/catchAsync";

export class RoomController {
	getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const rooms = await storage.room.find(req.query);

		res.status(200).json({
			success: true,
			data: {
				rooms
			}
		});
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const room = await storage.room.create(req.body);

		res.status(201).json({
			success: true,
			data: {
				room
			}
		});
	});

	delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		await storage.room.delete({ _id: req.params.id });

		res.status(204).json({
			success: true,
			data: null
		});
	});
}
