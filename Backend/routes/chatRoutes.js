import  express  from "express";
import { accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup} from "../controllers/chatControllers.js";
import protect from "../Middleware/auth.js";
const chatRoute=express.Router();

chatRoute.route("/").post(protect,accessChat);
chatRoute.route("/").get(protect,fetchChats);
chatRoute.route("/group").post(protect,createGroupChat);
chatRoute.route("/rename").put(protect,renameGroup);
chatRoute.route("/groupremove").put(protect,removeFromGroup);
chatRoute.route("/groupadd").put(protect,addToGroup);

export default chatRoute;