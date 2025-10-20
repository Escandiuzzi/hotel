import { ServicesRepository } from "../../repositories/services-repository";

export class GetAllServicesUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute() {
    const services = await this.servicesRepository.getAll();
    return services;
  }
}