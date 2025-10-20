import { UpdateGuestUseCase } from "./update-guest-use-case";
import { GuestsRepository, GuestData } from "../../repositories/guests-repository";

describe("UpdateGuestUseCase", () => {
    let guestsRepository: jest.Mocked<GuestsRepository>;
    let updateGuestUseCase: UpdateGuestUseCase;

    beforeEach(() => {
        guestsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
        } as unknown as jest.Mocked<GuestsRepository>;

        updateGuestUseCase = new UpdateGuestUseCase(guestsRepository);
    });

    it("deve atualizar um hóspede com sucesso quando dados válidos são fornecidos", async () => {
        const request = {
            id: "hospede-123",
            name: "Mariana Souza",
            phone: "(11) 99999-8888",
            email: "mariana.souza@email.com",
            document: "123.456.789-00",
            age: 32,
        };

        const updatedGuest: GuestData = {
            id: "hospede-123",
            name: "Mariana Souza",
            phone: "(11) 99999-8888",
            email: "mariana.souza@email.com",
            document: "123.456.789-00",
            age: 32,
        };

        guestsRepository.update.mockResolvedValueOnce(updatedGuest);

        const result = await updateGuestUseCase.execute(request);

        expect(guestsRepository.update).toHaveBeenCalledWith("hospede-123", {
            name: "Mariana Souza",
            phone: "(11) 99999-8888",
            email: "mariana.souza@email.com",
            document: "123.456.789-00",
            age: 32,
        });
        expect(result).toEqual(updatedGuest);
    });

    it("deve lançar erro se o ID do hóspede estiver faltando", async () => {
        const request: any = {
            name: "João Pereira",
            email: "joao.pereira@email.com",
        };

        await expect(updateGuestUseCase.execute(request)).rejects.toThrow(
            "Guest ID is required"
        );
        expect(guestsRepository.update).not.toHaveBeenCalled();
    });

    it("deve lançar erro se o hóspede não for encontrado", async () => {
        const request = {
            id: "hospede-404",
            name: "Fernanda Costa",
        };

        guestsRepository.update.mockResolvedValueOnce(null);

        await expect(updateGuestUseCase.execute(request)).rejects.toThrow(
            "Guest not found"
        );

        expect(guestsRepository.update).toHaveBeenCalledWith("hospede-404", {
            name: "Fernanda Costa",
        });
    });

    it("deve atualizar apenas os campos fornecidos", async () => {
        const request = {
            id: "hospede-123",
            phone: "(21) 98888-7777",
        };

        const updatedGuest: GuestData = {
            id: "hospede-123",
            name: "Camila Ferreira",
            phone: "(21) 98888-7777",
            email: "camila.ferreira@email.com",
            document: "223.334.445-56",
            age: 29,
        };

        guestsRepository.update.mockResolvedValueOnce(updatedGuest);

        const result = await updateGuestUseCase.execute(request);

        expect(guestsRepository.update).toHaveBeenCalledWith("hospede-123", {
            phone: "(21) 98888-7777",
        });
        expect(result!.phone).toBe("(21) 98888-7777");
    });

    it("deve atualizar a idade do hóspede", async () => {
        const request = {
            id: "hospede-789",
            age: 37,
        };

        const updatedGuest: GuestData = {
            id: "hospede-789",
            name: "Pedro Lima",
            phone: "(31) 97777-6666",
            email: "pedro.lima@email.com",
            document: "555.666.777-88",
            age: 37,
        };

        guestsRepository.update.mockResolvedValueOnce(updatedGuest);

        const result = await updateGuestUseCase.execute(request);

        expect(guestsRepository.update).toHaveBeenCalledWith("hospede-789", {
            age: 37,
        });
        expect(result!.age).toBe(37);
    });
});