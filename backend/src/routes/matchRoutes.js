import express from "express";
import { createMatch } from "../controllers/matchController.js";
const router = express.Router();

router.post("/createMatch", createMatch);
const matchRouter = router;

export default matchRouter;
