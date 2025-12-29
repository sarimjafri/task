import express from "express";
import { authenticated } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create",authenticated, createCategoryController );
router.put("/update",authenticated, updateCategoryController)
router.delete("/delete", authenticated, deleteCategoryController);

export default router;
