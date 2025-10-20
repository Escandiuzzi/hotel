import { ServicesRepository } from "../../repositories/services-repository";

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(id: string) {
    if (!id) {
      throw new Error("Service ID is required");
    }

    const service = await this.servicesRepository.getById(id);
    if (!service) {
      throw new Error("Service not found");
    }

    await this.servicesRepository.update(id, { isActive: false }); // soft delete
    return { message: "Service deleted successfully" };
  }
}