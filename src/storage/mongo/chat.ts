import { logger } from "../../config/logger";
import AppError from "../../utils/appError";
import Chat, { IChat } from "../../models/Chat";

export class ChatStorage {
	private scope = "storage.chat";

	async find(query: any): Promise<IChat[]> {
		try {
			return await Chat.find(query);
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}

	async findOne(query: object): Promise<IChat> {
		try {
			return (await Chat.findOne(query)) as IChat;
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async create(payload: IChat): Promise<IChat> {
		try {
			return await Chat.create(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async update(query: object, payload: IChat): Promise<any> {
		try {
			const chat = await Chat.findOneAndUpdate(query, payload, { new: true });

			if (!chat) {
				logger.warn(`${this.scope}.delete failed to findByIdAndDelete`);
				throw new AppError(404, "Chat is not found");
			}

			return chat;
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}
}
