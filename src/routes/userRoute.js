import express from "express";
import { deleteUser, getAllUsers, getUser, loginUser, registerUser, updateUser,  } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRoute = express.Router();

//post routes
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);

//get routes
userRoute.get("/get", authMiddleware, getAllUsers);


userRoute.get("/:UserId", authMiddleware, getUser);



//patch routes
userRoute.patch("/update/:UserId", authMiddleware, updateUser);


//delete route
userRoute.delete("/delete/:UserId",authMiddleware, deleteUser);



export default userRoute;