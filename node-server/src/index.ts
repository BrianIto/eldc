import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import CategoriesService from "./services/Categories/Categories.services";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", async (_, res) => {
  let data = await CategoriesService.create({ name: "Categoria 1" });
  res.status(201).send(data);
});

app.listen(process.env.API_PORT);

console.log("API Running at port " + process.env.API_PORT);
