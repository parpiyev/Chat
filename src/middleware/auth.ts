import { scryptSync, createCipheriv, createDecipheriv } from "crypto";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import config from "../config/config";
import { storage } from "../storage/main";

type DecodedToken = {
	id: number;
	iat: number;
};

export const signToken = async (data: object): Promise<string> => {
	const key = scryptSync(config.SecretKey, "salt", 24);
	const cipher = createCipheriv(config.Algorithm, key, Buffer.alloc(16, 0));

	return (
		cipher.update(JSON.stringify({ ...data, iat: Date.now() }), "utf8", "hex") +
		cipher.final("hex")
	);
};

const decodeToken = async (token: string): Promise<DecodedToken> => {
	const key = scryptSync(config.SecretKey, "salt", 24);
	const cipher = createDecipheriv(config.Algorithm, key, Buffer.alloc(16, 0));

	return JSON.parse(cipher.update(token, "hex", "utf8") + cipher.final("utf8"));
};

export default catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;

	if (!token) {
		throw new AppError(401, "Iltimos tizimni kiriting!");
	}

	const decoded = await decodeToken(token);

	const user = (await storage.user.find({ _id: decoded.id }))[0];

	if (!user) {
		throw new AppError(400, "Token foydalanuvchisi allaqachon oʻchirib tashlanganga oʻxshaydi");
	}

	res.locals.id = decoded.id;
	res.locals.user = user;

	next();
});
