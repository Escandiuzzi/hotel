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
        } as unknown as jest.Mocked<GuestsRepository>;

        updateGuestUseCase = new UpdateGuestUseCase(guestsRepository);
    });

    it("should update a guest successfully with valid data", async () => {
        const request = {
            id: "guest-123",
            name: "John Doe",
            phone: "1234567890",
            email: "john@example.com",
            document: "AB123456",
        };

        const updatedGuest: GuestData = {
            id: "guest-123",
            name: "John Doe",
            phone: "1234567890",
            email: "john@example.com",
            document: "AB123456",
        };

        guestsRepository.update.mockResolvedValueOnce(updatedGuest);

        const result = await updateGuestUseCase.execute(request);

        expect(guestsRepository.update).toHaveBeenCalledWith("guest-123", {
            name: "John Doe",
            phone: "1234567890",
            email: "john@example.com",
            document: "AB123456",
        });
        expect(result!).toEqual(updatedGuest);
    });

    it("should throw an error if guest ID is missing", async () => {
        const request: any = {
            name: "John Doe",
            email: "john@example.com",
        };

        await expect(updateGuestUseCase.execute(request))
            .rejects
            .toThrow("Guest ID is required");

        expect(guestsRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an error if guest is not found", async () => {
        const request = {
            id: "guest-404",
            name: "Jane Doe",
        };

        guestsRepository.update.mockResolvedValueOnce(null);

        await expect(updateGuestUseCase.execute(request))
            .rejects
            .toThrow("Guest not found");

        expect(guestsRepository.update).toHaveBeenCalledWith("guest-404", { name: "Jane Doe" });
    });

    it("should update only provided fields", async () => {
        const request = {
            id: "guest-123",
            phone: "9999999999",
        };

        const updatedGuest: GuestData = {
            id: "guest-123",
            name: "John Doe",
            phone: "9999999999",
            email: "john@example.com",
            document: "AB123456",
        };

        guestsRepository.update.mockResolvedValueOnce(updatedGuest);

        const result = await updateGuestUseCase.execute(request);

        expect(guestsRepository.update).toHaveBeenCalledWith("guest-123", { phone: "9999999999" });
        expect(result!.phone).toBe("9999999999");
    });
});