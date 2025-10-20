import { CreateServiceUseCase } from "./create-service-use-case";
import { ServicesRepository } from "../../repositories/services-repository";

describe("CreateServiceUseCase", () => {
  let servicesRepository: jest.Mocked<ServicesRepository>;
  let createServiceUseCase: CreateServiceUseCase;

  beforeEach(() => {
    servicesRepository = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    };
    createServiceUseCase = new CreateServiceUseCase(servicesRepository);
  });

  it("deve criar um serviço com dados válidos", async () => {
    const request = {
      name: "Café da Manhã",
      description: "Buffet completo com frutas, pães e bebidas quentes",
      price: 35.0,
    };

    servicesRepository.create.mockResolvedValueOnce("servico-123");

    const result = await createServiceUseCase.execute(request);

    expect(servicesRepository.create).toHaveBeenCalledWith(request);
    expect(result).toBe("servico-123");
  });

  it("deve lançar erro se o nome estiver faltando", async () => {
    const request: any = {
      description: "Serviço sem nome",
      price: 20.0,
    };

    await expect(createServiceUseCase.execute(request)).rejects.toThrow(
      "Service name is required"
    );

    expect(servicesRepository.create).not.toHaveBeenCalled();
  });

  it("deve lançar erro se o preço for inválido", async () => {
    const request: any = {
      name: "Serviço Inválido",
      description: "Erro de preço negativo",
      price: -15.0,
    };

    await expect(createServiceUseCase.execute(request)).rejects.toThrow(
      "Service price must be valid"
    );

    expect(servicesRepository.create).not.toHaveBeenCalled();
  });
});