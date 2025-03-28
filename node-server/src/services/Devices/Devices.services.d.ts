import { Prisma, Device } from "@prisma/client";
import { GetPaginated } from "../Categories/Categories.services.d";

/** @param c - The device element to be added;
 * @returns the new device created;
 */
type Create = (
  d: Prisma.DeviceCreateInput,
) => Prisma.Prisma__DeviceClient<Device>;

/** The delete fn to delete adevice
 * @param { number } id - the ID of the device to be deleted;
 * @returns the deleted device
 */
type Delete = (id: number) => Prisma.Prisma__DeviceClient<Device>;

/**
 * The service for the Device Model
 * Created to assure the interface/abstract first assurance and ISP principle from SOLID.
 */
export interface IDeviceService {
  get: GetPaginated<Device>;

  /**
   * Crate a new device;
   * @example
   * create({ category: {id: 1}, color: 'red', partNumber: 5 })
   * // returns {
   * //  id: 1,
   * //  category: {...},
   * //  color: 'red',
   * //	partNumber: 5
   * // }
   */
  create: Create;
  delete: Delete;
  isInvalid: (d: Partial<Device>) => string;
}
