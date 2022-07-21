import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import routes from "./routes/index";
import { expressLogger } from "./config/logger";
import { ErrorController } from "./controllers/error";

const app = express();
const errorController = new ErrorController();
const server = http.createServer(app);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLogger());

app.use(routes);

app.get("/status", (req: Request, res: Response) => {
	res.json({
		stauts: "OK"
	});
});

app.use(errorController.hanle);

export const io = new Server(server);
io.on("connection", () => {
	console.log("a user is connected");
});

export default server;
