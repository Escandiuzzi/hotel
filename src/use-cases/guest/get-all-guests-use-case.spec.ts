import { GetAllGuestsUseCase } from "./get-all-guests-use-case";
import { GuestsRepository } from "../../repositories/guests-repository";

describe("GetAllGuestsUseCase", () => {
    let guestsRepository: jest.Mocked<GuestsRepository>;
    let getAllGuestsUseCase: GetAllGuestsUseCase;

    beforeEach(() => {
        guestsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            getByCpf: jest.fn(),
        };
        getAllGuestsUseCase = new GetAllGuestsUseCase(guestsRepository);
    });

    it("deve retornar todos os hóspedes do repositório", async () => {
        const mockGuests = [
            {
                id: "hospede-1",
                name: "Camila Rodrigues",
                age: 27,
                phone: "(11) 98765-4321",
                email: "camila.rodrigues@email.com",
                document: "123.456.789-00",
            },
            {
                id: "hospede-2",
                name: "Eduardo Martins",
                age: 42,
                phone: "(21) 99876-5432",
                email: "eduardo.martins@email.com",
                document: "987.654.321-00",
            },
            {
                id: "hospede-3",
                name: "Gabriela Souza",
                age: 35,
                phone: "(31) 97654-3210",
                email: "gabriela.souza@email.com",
                document: "456.789.123-00",
            },
        ];

        guestsRepository.getAll.mockResolvedValue(mockGuests);

        const result = await getAllGuestsUseCase.execute();

        expect(guestsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockGuests);
    });

    it("deve retornar um array vazio se não existirem hóspedes", async () => {
        guestsRepository.getAll.mockResolvedValue([]);

        const result = await getAllGuestsUseCase.execute();

        expect(guestsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});