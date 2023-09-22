import express from "express";
import trimRequest from "trim-request";
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);
router.route("/testingauthMiddlware").get(trimRequest.all,authMiddleware, (req, res) => {
    res.send(req.user);
});

export default router;