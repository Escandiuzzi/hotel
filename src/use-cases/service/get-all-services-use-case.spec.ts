import { GetAllServicesUseCase } from "./get-all-services-use-case";
import { ServicesRepository } from "../../repositories/services-repository";

describe("GetAllServicesUseCase", () => {
  let servicesRepository: jest.Mocked<ServicesRepository>;
  let getAllServicesUseCase: GetAllServicesUseCase;

  beforeEach(() => {
    servicesRepository = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    };
    getAllServicesUseCase = new GetAllServicesUseCase(servicesRepository);
  });

  it("deve retornar todos os serviços do repositório", async () => {
    const mockServices = [
      {
        id: "servico-1",
        name: "Café da Manhã",
        description: "Buffet completo com frutas e pães",
        price: 35.0,
        isActive: true,
      },
      {
        id: "servico-2",
        name: "Lavanderia",
        description: "Serviço de lavagem e passagem de roupas",
        price: 45.0,
        isActive: true,
      },
    ];

    servicesRepository.getAll.mockResolvedValue(mockServices);

    const result = await getAllServicesUseCase.execute();

    expect(servicesRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockServices);
  });

  it("deve retornar um array vazio se não houver serviços", async () => {
    servicesRepository.getAll.mockResolvedValue([]);

    const result = await getAllServicesUseCase.execute();

    expect(servicesRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});