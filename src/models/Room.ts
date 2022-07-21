import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IRoom extends Document {
	_id: string;
	chat: string;
	whichUserWrote: string;
	users: string[];
}

const roomSchema = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4
		},
		chat: {
			type: String,
			ref: "Chat"
		},
		whichUserWrote: String,
		users: [
			{
				type: String,
				ref: "User",
				required: true
			}
		]
	},
	{ timestamps: true }
);

export default model<IRoom>("Room", roomSchema);
