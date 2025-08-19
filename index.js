import express from 'express';
import { PORT } from "./src/config/env.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import errorHandler from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';



dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

connectDB();

app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello World!"));





app.listen(PORT, () => {
    console.log(` 🚀 Server is up and running on port: ${PORT}`);
});

app.use(errorHandler);

