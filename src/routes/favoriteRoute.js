import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { addFavorite, deleteFavorite, getFavorites } from "../controllers/favoriteController.js";
const favoriteRoute = express.Router();

favoriteRoute.get("/get",authMiddleware,getFavorites );

favoriteRoute.post("/add", authMiddleware,addFavorite );

favoriteRoute.delete("/delete/:idMeal", authMiddleware,deleteFavorite );


export default favoriteRoute;