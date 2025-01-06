import express from "express";
import { crickNewsProvider } from "../controllers/crickNewsController.js";
const router = express.Router();

router.get("/cricknews", crickNewsProvider);

const crickNewsRouter = router;
export default crickNewsRouter;
