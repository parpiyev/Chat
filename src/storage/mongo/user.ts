import { logger } from "../../config/logger";
import AppError from "../../utils/appError";
import User, { IUser } from "../../models/User";

export class UserStorage {
	private scope = "storage.users";

	async find(query: object): Promise<IUser[]> {
		try {
			return await User.find(query);
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}

	async findOne(query: object): Promise<IUser> {
		try {
			return (await User.findOne(query)) as IUser;
		} catch (error) {
			logger.error(`${this.scope}.findOne: finished with error: ${error}`);
			throw error;
		}
	}

	async create(payload: IUser): Promise<IUser> {
		try {
			return await User.create(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async update(query: object, payload: IUser): Promise<IUser> {
		try {
			const user = await User.findOneAndUpdate(query, payload, { new: true });

			if (!user) {
				logger.warn(`${this.scope}.update failed to findOneAndUpdate`);
				throw new AppError(404, "User is not found");
			}

			return user;
		} catch (error) {
			logger.error(`${this.scope}.update: finished with error: ${error}`);
			throw error;
		}
	}

	async delete(query: object): Promise<any> {
		try {
			const user = await User.findOneAndDelete(query);

			if (!user) {
				logger.warn(`${this.scope}.delete failed to findOneAndDelete`);
				throw new AppError(404, "User is not found");
			}

			return user;
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}
}
