import admin from "firebase-admin";
const service_account = require("./test-efa2b-firebase-adminsdk-ywiqf-663ca082a9.json");

admin.initializeApp({
	credential: admin.credential.cert(service_account),
	databaseURL: "https://birzoom-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export { admin as firebase_admin };
