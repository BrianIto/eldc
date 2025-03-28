import CategoriesService from "../src/services/Categories/Categories.services";
import DevicesService from "../src/services/Devices/Devices.services"
import { PrismaClient } from "@prisma/client";

describe("Run Integration tests using Prisma in The Services of Category Table", () => {
  beforeAll(async () => {
    let prisma = new PrismaClient();
		await prisma.device.deleteMany({})
    await prisma.category.deleteMany({});
  });

  it("[INTEGRATION] Creates a new category", async () => {
    let data = await CategoriesService.create({ name: "Categoria 1" });
    expect(data.name).toBe("Categoria 1");
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
  });

  it("[INTEGRATION] Lists the categories created", async () => {
    let data = await CategoriesService.get(0, 10);
    expect(data).toHaveLength(1);
  });

  it("[INTEGRATION] Delete a category created", async () => {
    let elementCreated = await CategoriesService.get(0, 10);
    await CategoriesService.delete(elementCreated[0].id);
    let newArr = await CategoriesService.get(0, 10);
    expect(newArr).toHaveLength(0);
  });

  it("[UNIT] accept valid category name", () => {
    expect(CategoriesService.isInvalid({ name: "category 1" })).toBeFalsy();
  });

  it("[UNIT] doesn't accept a category name with less than 5 characters", () => {
    expect(CategoriesService.isInvalid({ name: "" })).toBe(
      "This field is required",
    );
  });

  it("[UNIT] doesn't accept a category name with more than than 128 characters", () => {
    let result = CategoriesService.isInvalid({
      name: new Array(200).fill("a").join(),
    });
    expect(result).toBe("Name must have less than 128 chars");
  });
});
