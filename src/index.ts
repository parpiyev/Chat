import DB from "./core/db";
import app from "./app";
import config from "./config/config";
import { logger } from "./config/logger";
(async function () {
	try {
		new DB().connect();

		app.listen(config.HttpPort, () => {
			logger.info(`INDEX: Server is running on port: ${config.HttpPort}`);
		});

		logger.info("INDEX: Database connection initialized.");
	} catch (e) {
		throw new Error(`DB connection error: ${e}`);
	}
})();
