import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
	_id: string;
	firstName: string;
	lastName: string;
	firebaseTokens: string[];
	phoneNumber: number;
	password: string;
}

const userSchema = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		firebaseTokens: [String],
		phoneNumber: {
			type: Number,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export default model<IUser>("User", userSchema);
