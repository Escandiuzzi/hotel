import { GetGuestByCpfUseCase } from "./get-guest-by-cpf-use-case";
import { GuestsRepository } from "../../repositories/guests-repository";

describe("GetGuestByCpfUseCase", () => {
  let guestsRepository: jest.Mocked<GuestsRepository>;
  let getGuestByCpfUseCase: GetGuestByCpfUseCase;

  beforeEach(() => {
    guestsRepository = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      getByCpf: jest.fn(),
    };
    getGuestByCpfUseCase = new GetGuestByCpfUseCase(guestsRepository);
  });

  it("deve retornar um hóspede quando encontrado pelo CPF", async () => {
    const mockGuest = {
      id: "hospede-123",
      name: "João Silva",
      age: 35,
      document: "123.456.789-00",
      phone: "(11) 99999-1234",
      email: "joao.silva@email.com",
    };

    guestsRepository.getByCpf.mockResolvedValueOnce(mockGuest);

    const result = await getGuestByCpfUseCase.execute({
      cpf: "123.456.789-00",
    });

    expect(guestsRepository.getByCpf).toHaveBeenCalledWith("123.456.789-00");
    expect(result).toEqual(mockGuest);
  });

  it("deve retornar null quando hóspede não for encontrado", async () => {
    guestsRepository.getByCpf.mockResolvedValueOnce(null);

    const result = await getGuestByCpfUseCase.execute({
      cpf: "999.999.999-99",
    });

    expect(guestsRepository.getByCpf).toHaveBeenCalledWith("999.999.999-99");
    expect(result).toBeNull();
  });

  it("deve lançar erro se o CPF estiver faltando", async () => {
    await expect(getGuestByCpfUseCase.execute({ cpf: "" })).rejects.toThrow(
      "CPF is required"
    );

    expect(guestsRepository.getByCpf).not.toHaveBeenCalled();
  });
});