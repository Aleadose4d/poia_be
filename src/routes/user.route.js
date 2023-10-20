import express from "express";
import trimRequest from "trim-request";
import { searchUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, searchUsers);
<<<<<<< HEAD
export default router;
=======
<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
