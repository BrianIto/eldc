import { Router } from "express";
import CategoriesService from "../services/Categories/Categories.services";

let CategoriesRouter = Router();

CategoriesRouter.get("/", async (req, res) => {
  let take = req.query.pageSize ? +req.query.pageSize : 10;
  let skip = req.query.pageNumber ? +req.query.pageNumber : 0;
  let data = await CategoriesService.get(skip, take);
  res.status(200).send(data);
});

CategoriesRouter.post("/", async (req, res) => {
  let data = req.body;
  let invalidMessage =  CategoriesService.isInvalid(data);
  if (invalidMessage) {
    res.status(400).send({ error: invalidMessage });
  } else {
    let result = await CategoriesService.create(data);
    res.status(201).send(result);
  }
});

CategoriesRouter.delete("/:id", async (req, res) => {
  if (await CategoriesService.exists(+req.params["id"])) {
    let data = await CategoriesService.delete(+req.params["id"]);
    res.status(200).send(data);
  } else {
    res.status(400).send("This category does not exists in the database");
  }
});

export default CategoriesRouter;
