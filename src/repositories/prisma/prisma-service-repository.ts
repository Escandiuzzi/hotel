import { prisma } from "../../prisma";
import {
  ServiceCreateData,
  ServiceData,
  ServicesRepository,
} from "../services-repository";

export class PrismaServicesRepository implements ServicesRepository {
  async create({ name, description, price }: ServiceCreateData) {
    const { id } = await prisma.service.create({
      data: { name, description, price },
    });
    return id;
  }

  async update(
    id: string,
    data: Partial<ServiceCreateData & { isActive: boolean }>
  ): Promise<ServiceData | null> {
    const updated = await prisma.service.update({
      where: { id },
      data,
    });
    return updated as ServiceData;
  }

  async getAll(): Promise<ServiceData[]> {
    const services = await prisma.service.findMany({
      where: { isActive: true },
    });
    return services as ServiceData[];
  }

  async getById(id: string): Promise<ServiceData | null> {
    const service = await prisma.service.findUnique({ where: { id } });
    return service as ServiceData | null;
  }
}