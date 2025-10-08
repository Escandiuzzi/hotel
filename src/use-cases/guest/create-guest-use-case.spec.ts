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
        };
        createGuestUseCase = new CreateGuestUseCase(guestsRepository);
    });

    it("should create a guest with valid data", async () => {
        const request = {
            name: "Alice Johnson",
            phone: "+55 11 99999-8888",
            email: "alice.johnson@example.com",
            document: "12345678900",
        };

        guestsRepository.create.mockResolvedValueOnce("guest-123");

        const result = await createGuestUseCase.execute(request);

        expect(guestsRepository.create).toHaveBeenCalledWith(request);
        expect(result).toBe("guest-123");
    });

    it("should throw an error if name is missing", async () => {
        const request: any = {
            phone: "12345",
            email: "guest@example.com",
            document: "11111111111",
        };

        await expect(createGuestUseCase.execute(request))
            .rejects
            .toThrow("Name is required");

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if phone is missing", async () => {
        const request: any = {
            name: "Bob",
            email: "guest@example.com",
            document: "11111111111",
        };

        await expect(createGuestUseCase.execute(request))
            .rejects
            .toThrow("Phone is required");

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if email is missing", async () => {
        const request: any = {
            name: "Charlie",
            phone: "12345",
            document: "11111111111",
        };

        await expect(createGuestUseCase.execute(request))
            .rejects
            .toThrow("Email is required");

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if document is missing", async () => {
        const request: any = {
            name: "David",
            phone: "12345",
            email: "guest@example.com",
        };

        await expect(createGuestUseCase.execute(request))
            .rejects
            .toThrow("Document is required");

        expect(guestsRepository.create).not.toHaveBeenCalled();
    });
});
