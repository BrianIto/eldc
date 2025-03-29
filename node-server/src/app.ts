import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import CategoriesRouter from "./controllers/Categories.controller";
import DevicesRouter from "./controllers/Devices.controller";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/categories", CategoriesRouter);
app.use("/devices", DevicesRouter);

export default app;
