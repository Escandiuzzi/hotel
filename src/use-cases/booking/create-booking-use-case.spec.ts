import { CreateBookingUseCase } from "./create-booking-use-case";
import { BookingsRepository } from "../../repositories/bookings-repository";

describe("CreateBookingUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let createBookingUseCase: CreateBookingUseCase;

    beforeEach(() => {
        bookingsRepository = {
            create: jest.fn(),
        } as unknown as jest.Mocked<BookingsRepository>;

        createBookingUseCase = new CreateBookingUseCase(bookingsRepository);
    });

    it("should create a booking when all fields are valid", async () => {
        const request = {
            entryDate: new Date("2025-09-20T15:00:00.000Z"),
            departureDate: new Date("2025-09-25T11:00:00.000Z"),
            status: "confirmed",
        };

        await createBookingUseCase.execute(request);

        expect(bookingsRepository.create).toHaveBeenCalledWith({
            entryDate: request.entryDate,
            departureDate: request.departureDate,
            status: request.status,
        });
    });

    it("should throw an error if entryDate is missing", async () => {
        const request = {
            entryDate: undefined as unknown as Date,
            departureDate: new Date("2025-09-25T11:00:00.000Z"),
            status: "confirmed",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Entry date is required"
        );
    });

    it("should throw an error if departureDate is missing", async () => {
        const request = {
            entryDate: new Date("2025-09-20T15:00:00.000Z"),
            departureDate: undefined as unknown as Date,
            status: "confirmed",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Departure date is required"
        );
    });

    it("should throw an error if status is missing", async () => {
        const request = {
            entryDate: new Date("2025-09-20T15:00:00.000Z"),
            departureDate: new Date("2025-09-25T11:00:00.000Z"),
            status: "",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Status is required"
        );
    });
});