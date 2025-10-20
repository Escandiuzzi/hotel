import { ServicesRepository } from "../../repositories/services-repository";

interface CreateServiceUseCaseRequest {
  name: string;
  description?: string;
  price: number;
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(request: CreateServiceUseCaseRequest) {
    const { name, description, price } = request;

    if (!name) throw new Error("Service name is required");
    if (!description) throw new Error("Description is required");
    if (price == null || price < 0)
      throw new Error("Service price must be valid");

    const id = await this.servicesRepository.create({ name, description, price });
    return id;
  }
}