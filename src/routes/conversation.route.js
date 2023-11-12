import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
<<<<<<< HEAD
import {createGroup, create_open_conversation, getConversations} from "../controllers/conversation.controller.js";
const router = express.Router();

router
.route("/")
.post(trimRequest.all, authMiddleware, create_open_conversation);
=======
import {
  createGroup,
  create_open_conversation,
  getConversations,
} from "../controllers/conversation.controller.js";
const router = express.Router();

router
  .route("/")
  .post(trimRequest.all, authMiddleware, create_open_conversation);
>>>>>>> 46879bbef9fbe440dde413ab9dd69e804c64d55c
router.route("/").get(trimRequest.all, authMiddleware, getConversations);
router.route("/group").post(trimRequest.all, authMiddleware, createGroup);

export default router;