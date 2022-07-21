import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IChat extends Document {
	_id: string;
	text: string;
	file: string;
	room: string;
	isRead: boolean;
	fromUser: string;
	toUser: string;
}

const chatSchema = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4
		},
		text: String,
		file: String,
		room: {
			type: String,
			required: true
		},
		isRead: Boolean,
		fromUser: {
			type: String,
			required: true
		},
		toUser: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export default model<IChat>("Chat", chatSchema);
