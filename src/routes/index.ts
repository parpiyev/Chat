import path from "path";
import express, { Router } from "express";
import userRouter from "./user";
import roomRouter from "./room";
import chatRouter from "./chat";

const router = Router({ mergeParams: true });

router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/chat", chatRouter);
router.use("/api/file", express.static(path.join(__dirname, "../uploads")));

export default router;
