import { IDeviceService } from "./Devices.services.d";
import { Device, PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();
const table = prisma.device;

const DeviceSchema = yup.object<Device>({
  id: yup.number().optional(),
  color: yup
    .string()
    .required("Field color is required")
    .max(16, "Color should not have more than 16 chars"),
  partNumber: yup.number().required("Part number is required").positive("The part number should be positive"),
});

const DeviceService: IDeviceService = {
  get: (skip, take) => table.findMany({ take, skip, include: { category: true } }),
  create: (d) => table.create({ data: d }),
  delete: (id) => table.delete({ where: { id } }),
  exists: (id) => table.findFirst({ where: { id } }),
  isInvalid: (c: Device) => {
    try {
      DeviceSchema.validateSync(c);
      return "";
    } catch (e) {
      return e.message;
    }
  },
};

export default DeviceService;
