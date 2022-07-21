import multer from "multer";

export default () => {
	return multer({
		storage: multer.memoryStorage(),
		fileFilter: (req, file, cb) => {
			cb(null, true);
		}
	});
};
