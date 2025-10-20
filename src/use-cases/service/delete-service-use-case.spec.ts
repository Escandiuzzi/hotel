import { DeleteServiceUseCase } from "./delete-service-use-case";
import { ServicesRepository } from "../../repositories/services-repository";

describe("DeleteServiceUseCase", () => {
  let servicesRepository: jest.Mocked<ServicesRepository>;
  let deleteServiceUseCase: DeleteServiceUseCase;

  beforeEach(() => {
    servicesRepository = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    };
    deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository);
  });

  it("deve excluir (soft delete) um serviço existente", async () => {
    const serviceId = "servico-123";
    const mockService = {
      id: serviceId,
      name: "Café da Manhã",
      description: "Buffet completo",
      price: 35.0,
      isActive: true,
    };

    servicesRepository.getById.mockResolvedValueOnce(mockService);
    servicesRepository.update.mockResolvedValueOnce({
      ...mockService,
      isActive: false,
    });

    const result = await deleteServiceUseCase.execute(serviceId);

    expect(servicesRepository.getById).toHaveBeenCalledWith(serviceId);
    expect(servicesRepository.update).toHaveBeenCalledWith(serviceId, {
      isActive: false,
    });
    expect(result).toEqual({ message: "Service deleted successfully" });
  });

  it("deve lançar erro se o ID do serviço não for informado", async () => {
    await expect(deleteServiceUseCase.execute("")).rejects.toThrow(
      "Service ID is required"
    );

    expect(servicesRepository.getById).not.toHaveBeenCalled();
  });

  it("deve lançar erro se o serviço não for encontrado", async () => {
    const serviceId = "servico-404";

    servicesRepository.getById.mockResolvedValueOnce(null);

    await expect(deleteServiceUseCase.execute(serviceId)).rejects.toThrow(
      "Service not found"
    );

    expect(servicesRepository.update).not.toHaveBeenCalled();
  });
});