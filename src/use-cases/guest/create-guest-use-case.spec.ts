import { CreateGuestUseCase } from "./create-guest-use-case";
import { GuestsRepository } from "../../repositories/guests-repository";

describe("CreateGuestUseCase", () => {
    let guestsRepository: jest.Mocked<GuestsRepository>;
    let createGuestUseCase: CreateGuestUseCase;

    beforeEach(() => {
        guestsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            getByCpf: jest.fn(),
        };
        createGuestUseCase = new CreateGuestUseCase(guestsRepository);
    });

    it("deve criar um hóspede com dados válidos", async () => {
        const request = {
            name: "Beatriz Oliveira",
            phone: "(11) 98765-4321",
            email: "beatriz.oliveira@email.com",
            document: "123.456.789-00",
            age: 31,
        };

        guestsRepository.create.mockResolvedValueOnce("hospede-123");

        const result = await createGuestUseCase.execute(request);

        expect(guestsRepository.create).toHaveBeenCalledWith(request);
        expect(result).toBe("hospede-123");
    });

    it("deve lançar erro se o nome estiver faltando", async () => {
        const request: any = {
            phone: "(31) 97654-3210",
            email: "hospede@email.com",
            document: "111.111.111-11",
            age: 25,
        };

        await expect(createGuestUseCase.execute(request)).rejects.toThrow(
            "Name is required"
        );

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se o telefone estiver faltando", async () => {
        const request: any = {
            name: "Mariana Costa",
            email: "mariana.costa@email.com",
            document: "222.222.222-22",
            age: 28,
        };

        await expect(createGuestUseCase.execute(request)).rejects.toThrow(
            "Phone is required"
        );

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se o email estiver faltando", async () => {
        const request: any = {
            name: "Paulo Ferreira",
            phone: "(41) 98765-1234",
            document: "333.333.333-33",
            age: 45,
        };

        await expect(createGuestUseCase.execute(request)).rejects.toThrow(
            "Email is required"
        );

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se o documento estiver faltando", async () => {
        const request: any = {
            name: "Juliana Santos",
            phone: "(51) 97654-9876",
            email: "juliana.santos@email.com",
            age: 33,
        };

        await expect(createGuestUseCase.execute(request)).rejects.toThrow(
            "Document is required"
        );

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a idade estiver faltando", async () => {
        const request: any = {
            name: "Roberto Lima",
            phone: "(61) 99876-5432",
            email: "roberto.lima@email.com",
            document: "444.444.444-44",
        };

        await expect(createGuestUseCase.execute(request)).rejects.toThrow(
            "Age is required"
        );

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });
});