import { Prisma, Category } from "@prisma/client";

/** @param c - The category element to be added;
 * @returns the new category created;
 */
type Create = (
  c: Prisma.CategoryCreateInput,
) => Prisma.Prisma__CategoryClient<Category>;
/** Get paginated array of Categories
 * @param { number } skip - the page number to used
 * @param { number } take - the size of the page.
 * @returns { GetPaginated<Category> } the paginated array of categories.
 */
export type GetPaginated<T> = (
  skip: number,
  take: number,
) => Prisma.PrismaPromise<T[]>;
/** The delete fn to delete a category
 * @param { number } id - the ID of the category to be deleted;
 * @returns the deleted category
 */
type Delete = (id: number) => Prisma.Prisma__CategoryClient<Category>;
/**
 * The service for the Category Model
 * Created to assure the interface/abstract first assurance and ISP principle from SOLID.
 */
export interface ICategoriesService {
  /**
   * Crate a new category;
   * @example
   * create({ name: "Category 1" }) // returns { id: 1, name: "Category 1" }
   */
  create: Create;
  /** Get paginated array of Categories
   * @example
   * get(0, 10) // returns the array of first page with 10 elements;
   */
  get: GetPaginated<Category>;

  /**
   * Delete the a specific category based on its ID;
   * @example
   * delete(1) // returns { id: 1, name "Category 1" }
   */
  delete: Delete;
  /**
   * Check if a category exists, if exists return it,
   * if not returns undefined
   * @param { number } id - the id to be searched for;
   */
  exists: (
    id: number,
  ) => Prisma.Prisma__CategoryClient<Category> | undefined;
  /**
   * check if it's valid of not. If valid returns true, of not returns an error string;
   * @example
   * isValid({ name: "Category 1"}) //returns true
   * isValid({ name: ""}) //returns "Name must have more than 5 chars"
   */
  isInvalid: (c: Partial<Category>) => string;
}
