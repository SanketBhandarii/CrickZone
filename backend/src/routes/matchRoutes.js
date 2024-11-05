import express from "express";
import { createMatch, deleteMatch } from "../controllers/matchController.js";
const router = express.Router();

router.post("/createMatch", createMatch);
router.post("/deleteMatch", deleteMatch)
const matchRouter = router;

export default matchRouter;
