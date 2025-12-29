import express from "express";
import { authenticated } from "../middlewares/authMiddleware.js";
import { createBookController, deleteBookController, updateBookController } from "../controllers/bookController.js";

const router = express.Router();

router.post("/create",authenticated, createBookController);
router.put("/update",authenticated, updateBookController)
router.delete("/delete",authenticated, deleteBookController)

export default router;
