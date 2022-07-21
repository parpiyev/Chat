import { ChatStorage } from "./mongo/chat";
import { RoomStorage } from "./mongo/room";
import { UserStorage } from "./mongo/user";

interface IStorage {
	user: UserStorage;
	chat: ChatStorage;
	room: RoomStorage;
}

export const storage: IStorage = {
	user: new UserStorage(),
	chat: new ChatStorage(),
	room: new RoomStorage()
};
