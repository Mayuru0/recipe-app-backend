import express from 'express';
import { PORT } from "./src/config/env.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import errorHandler from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';
import userRoute from './src/routes/userRoute.js';
import cookieParser from 'cookie-parser';
import recipesRoute from './src/routes/recipesRoute.js';
import favoriteRoute from './src/routes/favoriteRoute.js';


dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello World!"));


//user route
app.use("/api/user",userRoute)

//recipe route
app.use("/api/recipe",recipesRoute)

//favorite route
app.use("/api/favorite",favoriteRoute)


app.listen(PORT, () => {
    console.log(` 🚀 Server is up and running on port: ${PORT}`);
});

app.use(errorHandler);

