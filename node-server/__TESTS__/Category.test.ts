import app from "../src/app";
import CategoriesService from "../src/services/Categories/Categories.services";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

describe("Run Integration tests using Prisma in The Services of Category Table", () => {
  beforeAll(async () => {
    let prisma = new PrismaClient();
    await prisma.device.deleteMany({});
    await prisma.category.deleteMany({});
  });

  describe("[E2E TESTS]", () => {
    afterAll(async () => {
      let prisma = new PrismaClient();
      await prisma.device.deleteMany({});
      await prisma.category.deleteMany({});
    });
    it("Create category successfully", async () => {
      const res = await request(app)
        .post("/categories")
        .send({ name: "Categoria " })
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/);
      expect(res.body).not.toBeNull();

      const res1 = await request(app)
        .post("/categories")
        .send({ name: "        " })
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res1.body).not.toBeNull();

      const res2 = await request(app)
        .post("/categories")
        .send({})
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      expect(res2.body).not.toBeNull();
    });

    it("Lists categories successfully", async () => {
      const res = await request(app)
        .get("/categories")
        .expect(200)
        .expect("Content-Type", /json/);
      expect(res.body).not.toBeNull();

      const res1 = await request(app)
        .get("/categories?pageSize=555&pageNumber=1")
        .expect(200)
        .expect("Content-Type", /json/);
      expect(res1.body).not.toBeNull();
    });
    it("Deletes a category successfully", async () => {
      const res1 = await request(app)
        .post("/categories")
        .send({ name: "Categoria abc" });
      const res = await request(app)
        .delete("/categories/" + res1.body.id)
        .expect(200);

      await request(app)
        .delete("/categories/" + 9999)
        .expect(400);
    });
  });

  describe("[INTEGRATION TESTS]", () => {
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

    it("[INTEGRATION] Check if a category exists", async () => {
      let el = await CategoriesService.exists(1);
    });
  });
  describe("[UNIT TESTS]", () => {
    it("[UNIT] accept valid category name", () => {
      expect(CategoriesService.isInvalid({ name: "category 1" })).toBeFalsy();
    });

    it("[UNIT] doesn't accept a category name with less than 5 characters", () => {
      expect(CategoriesService.isInvalid({ name: "" })).toBe(
        "Name field is required",
      );
    });

    it("[UNIT] doesn't accept a category name with more than than 128 characters", () => {
      let result = CategoriesService.isInvalid({
        name: new Array(200).fill("a").join(),
      });
      expect(result).toBe("Name must have less than 128 chars");
    });
  });
});
