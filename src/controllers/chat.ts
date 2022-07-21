import { NextFunction, Request, Response } from "express";
import { storage } from "../storage/main";
import path from "path";
import { writeFile } from "fs/promises";
import { io } from "../app";
import catchAsync from "../utils/catchAsync";
import { firebase_admin } from "../config/firebase";
import { IRoom } from "../models/Room";

export class ChatController {
	get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = res.locals,
			_id = req.params.id;

		const chat1 = await storage.chat.find({ fromUser: id, toUser: _id }),
			chat2 = await storage.chat.find({ fromUser: _id, toser: id });

		res.status(200).json({
			success: true,
			data: {
				chat1,
				chat2
			}
		});
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { toUser } = req.body,
			{ id, user } = res.locals;

		// user bor yoqligini tekshirish uchun ishlatilyabdi va push notification uchun
		const to = await storage.user.findOne({ _id: toUser });

		if (req.file) {
			req.body.file = `${req.file.originalname.split(".")[0]}-${Date.now()}${path.extname(
				req.file.originalname
			)}`;
			await writeFile(path.join(__dirname, "../uploads", req.body.file), req.file.buffer);
		}

		const chat = await storage.chat.create({ ...req.body, fromUser: id });

		await storage.room.update({ _id: chat.room }, {
			chat: chat.id,
			whichUserWrote: chat.fromUser
		} as IRoom);

		io.emit(`${chat.room}`, chat);

		let n = 0;
		async function recusive() {
			setTimeout(async () => {
				const old_chat = await storage.chat.findOne({ _id: chat._id, isRead: true });
				console.log(n);

				if (!old_chat) io.emit(`${chat.room}`, chat);
				if (n < 3 && !old_chat) recusive();
			}, 5000);
			n++;
		}
		recusive();

		const notificationOptions = {
			contentAvailable: true,
			priority: "high",
			timeToLive: 60 * 60 * 24
		};

		// firebaase token bo'lsa komentan o'chin push xarab qurulmaga boradi

		// if (to.firebaseTokens.length)
		// 	await firebase_admin.messaging().sendToDevice(
		// 		to.firebaseTokens,
		// 		{
		// 			notification: {
		// 				title: `${user.first_name} ${user.last_name}`,
		// 				body: `${chat.text ?? chat.file}`
		// 			}
		// 		},
		// 		notificationOptions
		// 	);

		res.status(201).json({
			success: true,
			data: {
				chat
			}
		});
	});

	update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = res.locals,
			_id = req.params.id;

		const chat = await storage.chat.update({ _id, toUser: id }, req.body);

		res.status(200).json({
			success: true,
			data: {
				chat
			}
		});
	});
}
