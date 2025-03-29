import app from "../src/app";
import { Category } from "@prisma/client";
import CategoriesService from "../src/services/Categories/Categories.services";
import DeviceService from "../src/services/Devices/Devices.services";
import request from "supertest";

describe("Tests the Devices Model", () => {
  let categories: Category[] = [];

  beforeAll(async () => {
    await CategoriesService.create({ name: "Cat 1" });
    categories = await CategoriesService.get(0, 10);
  });

  describe("[E2E Tests]", () => {
    it("should create a device properly with creating a category first", async () => {
      let category = await CategoriesService.create({ name: "Categoria 1" });
      let data = {
        color: "red",
        partNumber: 234,
        category: { id: category.id },
      };
      await request(app).post("/devices/").send(data).expect(200);
    });

    it("should create a device properly with creating a category at run", async () => {
      let data = {
        color: "red",
        partNumber: 234,
        category: { name: "Hello world" },
      };
      await request(app).post("/devices/").send(data).expect(200);
    });

    it("should not create a device if the category doesnt exists", async () => {
      let data = {
        color: "red",
        partNumber: 234,
        category: { id: 123 },
      };
      await request(app).post("/devices/").send(data).expect(400);
    });


    it("should not create a device if the category created is invalid", async () => {
      let data = {
        color: "red",
        partNumber: 234,
        category: { name: "" },
      };
      await request(app).post("/devices/").send(data).expect(400);
    });

    it("should get the devices", async () => {
      let data = await request(app)
        .get("/devices/?pageNumber=1&pageSize=10")
        .expect(200);
      expect(data.body.length).toBeGreaterThan(0);
    });


    it("should get the devices", async () => {
      let data = await request(app)
        .get("/devices")
        .expect(200);
      expect(data.body.length).toBeGreaterThan(0);
    });
  });

  it("[INTEGRATION] should create a device with a specific category", async () => {
    let data = await DeviceService.create({
      category: { connect: { id: categories[0].id } },
      color: "red",
      partNumber: 5,
    });
    expect(data).not.toBeNull();
  });
  it("[INTEGRATION] should get the devices paginated", async () => {
    await DeviceService.create({
      category: { connect: { id: categories[0].id } },
      color: "red",
      partNumber: 5,
    });
    let data = await DeviceService.get(0, 10);
    expect(data.length).toBeGreaterThan(0);
  });
  it("[INTEGRATION] should remove a device based on it's id", async () => {
    let el = await DeviceService.create({
      category: { connect: { id: categories[0].id } },
      color: "red",
      partNumber: 5,
    });
    let oldlen = (await DeviceService.get(0, 10)).length;
    await DeviceService.delete(el.id);
    let newlen = (await DeviceService.get(0, 10)).length;
    expect(oldlen - newlen).toBe(1);
  });
  it("[INTEGRATION] to create should be a valid category", () => {});
  it("[UNIT] should not accept empty color", () => {
    let data = DeviceService.isInvalid({
      categoryId: categories[0].id,
      color: "",
      partNumber: 5,
    });
    expect(data).toBe("Field color is required");
  });
  it("[UNIT] Color cannot have more than 16 chars", () => {
    let data = DeviceService.isInvalid({
      categoryId: categories[0].id,
      color: "djsakldjlaksjdlaksjdlaksdjklasjd",
      partNumber: 5,
    });
    expect(data).toBe("Color should not have more than 16 chars");
  });
  it("[UNIT] Should not accept empty part number", () => {
    let data = DeviceService.isInvalid({
      categoryId: categories[0].id,
      color: "red",
      partNumber: undefined,
    });
    expect(data).toBe("Part number is required");
  });
  it("[UNIT] Part Number must be an positive integer", () => {
    let data = DeviceService.isInvalid({
      categoryId: categories[0].id,
      color: "red",
      partNumber: -1,
    });
    expect(data).toBe("The part number should be positive");
  });

  it("[UNIT] Should return empty array if device is ok", () => {
    let data = DeviceService.isInvalid({
      categoryId: categories[0].id,
      color: "red",
      partNumber: 1,
    });
    expect(data).toBeFalsy();
  });
});
