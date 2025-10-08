import { CreateBookingUseCase } from "./create-booking-use-case";
import { BookingsRepository } from "../../repositories/bookings-repository";

describe("CreateBookingUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let createBookingUseCase: CreateBookingUseCase;

    beforeEach(() => {
        bookingsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
        };
        createBookingUseCase = new CreateBookingUseCase(bookingsRepository);
    });

    it("should create a booking with valid data", async () => {
        const request = {
            guestId: "guest-123",
            room: "101",
            reservationDate: new Date("2025-09-23T10:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "CONFIRMED",
        };

        bookingsRepository.create.mockResolvedValueOnce("booking-123");

        const result = await createBookingUseCase.execute(request);
        
        expect(bookingsRepository.create).toHaveBeenCalledWith(request);
        expect(bookingsRepository.create).toHaveBeenCalledTimes(1);
        expect(result).toBe("booking-123");
    });

    it("should throw an error if guestId is missing", async () => {
        const request: any = {
            entryDate: new Date(),
            departureDate: new Date(),
            status: "CONFIRMED",
        };

        await expect(createBookingUseCase.execute(request))
            .rejects
            .toThrow("Guest ID is required");

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if entryDate is missing", async () => {
        const request: any = {
            guestId: "guest-123",
            departureDate: new Date(),
            status: "CONFIRMED",
        };

        await expect(createBookingUseCase.execute(request))
            .rejects
            .toThrow("Entry date is required");

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if departureDate is missing", async () => {
        const request: any = {
            guestId: "guest-123",
            entryDate: new Date(),
            status: "CONFIRMED",
        };

        await expect(createBookingUseCase.execute(request))
            .rejects
            .toThrow("Departure date is required");

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error if status is missing", async () => {
        const request: any = {
            guestId: "guest-123",
            entryDate: new Date(),
            departureDate: new Date(),
        };

        await expect(createBookingUseCase.execute(request))
            .rejects
            .toThrow("Status is required");

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });
});
