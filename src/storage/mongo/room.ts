import { logger } from "../../config/logger";
import AppError from "../../utils/appError";
import Room, { IRoom } from "../../models/Room";

export class RoomStorage {
	private scope = "storage.room";

	async find(query: object): Promise<IRoom[]> {
		try {
			return await Room.find(query).populate([
				{
					path: "chat",
					select: "text file createdAt"
				},
				{
					path: "users",
					select: "firstName lastName"
				}
			]);
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}

	async findOne(query: object): Promise<IRoom> {
		try {
			const user = await Room.findOne(query);

			if (!user) {
				logger.warn(`${this.scope}.get failed to findOne`);
				throw new AppError(404, "Room is not found");
			}

			return user;
		} catch (error) {
			logger.error(`${this.scope}.findOne: finished with error: ${error}`);
			throw error;
		}
	}

	async create(payload: IRoom): Promise<IRoom> {
		try {
			return await Room.create(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async update(query: object, payload: IRoom): Promise<IRoom> {
		try {
			const user = await Room.findOneAndUpdate(query, payload, { new: true });

			if (!user) {
				logger.warn(`${this.scope}.update failed to findOneAndUpdate`);
				throw new AppError(404, "Room is not found");
			}

			return user;
		} catch (error) {
			logger.error(`${this.scope}.update: finished with error: ${error}`);
			throw error;
		}
	}

	async delete(query: object): Promise<any> {
		try {
			const user = await await Room.findOneAndDelete(query);

			if (!user) {
				logger.warn(`${this.scope}.delete failed to findOneAndDelete`);
				throw new AppError(404, "Room is not found");
			}

			return user;
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}
}
