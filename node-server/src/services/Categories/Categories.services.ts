import { Category, PrismaClient } from "@prisma/client";
import type { ICategoriesService } from "./Categories.services.d";
import * as yup from "yup";

const prisma = new PrismaClient();
const table = prisma.category;

let CategoriesSchema = yup.object<Category>({
  name: yup
    .string()
    .required("Name field is required")
    .trim()
    .min(5, "Name must have more than 5 chars")
    .max(128, "Name must have less than 128 chars"),
  id: yup.number().optional(),
});

const CategoriesService: ICategoriesService = {
  create: (c) => table.create({ data: CategoriesSchema.cast(c) as Category }),
  get: (skip, take) => table.findMany({ skip, take }),
  delete: (id) => table.delete({ where: { id } }),
  exists: (id) => table.findFirst({ where: { id } }),
  isInvalid: (c) => {
    try {
      CategoriesSchema.validateSync(c);
      return "";
    } catch (e) {
      return e.message;
    }
  },
};

export default CategoriesService;
