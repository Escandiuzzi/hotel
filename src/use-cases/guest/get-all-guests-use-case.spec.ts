import { GetAllGuestsUseCase } from "./get-all-guests-use-case";
import { GuestsRepository } from "../../repositories/guests-repository";

describe("GetAllGuestsUseCase", () => {
    let guestsRepository: jest.Mocked<GuestsRepository>;
    let getAllGuestsUseCase: GetAllGuestsUseCase;

    beforeEach(() => {
        guestsRepository = {
            create: jest.fn(),
            getAll: jest.fn(),
        };
        getAllGuestsUseCase = new GetAllGuestsUseCase(guestsRepository);
    });

    it("should return all guests from the repository", async () => {
        const mockGuests = [
            {
                id: "guest-1",
                name: "Alice Johnson",
                phone: "+55 11 99999-8888",
                email: "alice@example.com",
                document: "12345678900",
            },
            {
                id: "guest-2",
                name: "Bob Smith",
                phone: "+55 21 98888-7777",
                email: "bob@example.com",
                document: "98765432100",
            },
        ];

        guestsRepository.getAll.mockResolvedValue(mockGuests);

        const result = await getAllGuestsUseCase.execute();

        expect(guestsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockGuests);
    });

    it("should return an empty array if no guests exist", async () => {
        guestsRepository.getAll.mockResolvedValue([]);

        const result = await getAllGuestsUseCase.execute();

        expect(guestsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
