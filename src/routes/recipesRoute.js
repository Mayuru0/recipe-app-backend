import express from "express";
import { getCategories, getRecipeDetails, getRecipesByCategory } from "../controllers/recipesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const recipesRoute = express.Router();

recipesRoute.get("/categories", getCategories);

recipesRoute.get("/:id",authMiddleware, getRecipeDetails);

recipesRoute.get("/categories/:category",authMiddleware, getRecipesByCategory);

export default recipesRoute;


