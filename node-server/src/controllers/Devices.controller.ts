import { Router } from "express";
import DeviceService from "../services/Devices/Devices.services";
import { Prisma } from "../../generated/prisma";
import CategoriesService from "../services/Categories/Categories.services";

const DevicesRouter = Router();

DevicesRouter.get("/", async (req, res) => {
  let take = req.query.pageSize ? +req.query.pageSize : 10;
  let skip = req.query.pageNumber ? +req.query.pageNumber : 0;
  let data = await DeviceService.get(skip, take);
  res.status(200).send(data);
});

DevicesRouter.post("/", async (req, res) => {
  let generateData = req.body;

  let data: Prisma.DeviceCreateInput | undefined;
  if (req.body.category.id) {
    let catId = req.body.category.id;
    if (await CategoriesService.exists(catId)) {
      data = {
        ...generateData,
        category: {
          connect: {
            id: req.body.category.id,
          },
        },
      };
    } else {
      res.status(400).send("This category doesn't exist.");
    }
  } else {
    if (!CategoriesService.isInvalid(req.body.category)) {
      data = { ...generateData, category: { create: req.body.category } };
    } else {
      res.status(400).send("This category is not valid");
    }
  }
  if (data) {
    let result = await DeviceService.create(data);
    res.status(200).send(result);
  }
});

export default DevicesRouter;
