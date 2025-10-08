import { UpdateBookingUseCase } from "./update-booking-use-case";
import { BookingsRepository, BookingData } from "../../repositories/bookings-repository";

describe("UpdateBookingUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let updateBookingUseCase: UpdateBookingUseCase;

    beforeEach(() => {
        bookingsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
        } as unknown as jest.Mocked<BookingsRepository>;

        updateBookingUseCase = new UpdateBookingUseCase(bookingsRepository);
    });

    it("should update a booking successfully when valid data is provided", async () => {
        const request = {
            id: "booking-123",
            guestId: "guest-123",
            room: "101",
            reservationDate: new Date("2025-09-23T10:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "CONFIRMED",
        };

        const updatedBooking: BookingData = {
            id: "booking-123",
            guestName: "John Doe",
            room: "101",
            reservationDate: request.reservationDate!,
            entryDate: request.entryDate!,
            departureDate: request.departureDate!,
            status: "CONFIRMED",
        };

        bookingsRepository.update.mockResolvedValueOnce(updatedBooking);

        const result = await updateBookingUseCase.execute(request);

        // Use non-null assertion (!) to tell TS that result cannot be null here
        expect(result!).toEqual(updatedBooking);
        expect(bookingsRepository.update).toHaveBeenCalledWith("booking-123", {
            guestId: "guest-123",
            room: "101",
            reservationDate: request.reservationDate,
            entryDate: request.entryDate,
            departureDate: request.departureDate,
            status: "CONFIRMED",
        });
    });

    it("should throw an error if booking ID is missing", async () => {
        const request: any = {
            guestId: "guest-123",
            status: "CONFIRMED",
        };

        await expect(updateBookingUseCase.execute(request))
            .rejects
            .toThrow("Booking ID is required");

        expect(bookingsRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an error if the booking is not found", async () => {
        const request = {
            id: "booking-404",
            status: "CANCELLED",
        };

        bookingsRepository.update.mockResolvedValueOnce(null);

        await expect(updateBookingUseCase.execute(request))
            .rejects
            .toThrow("Booking not found");

        expect(bookingsRepository.update).toHaveBeenCalledWith("booking-404", { status: "CANCELLED" });
    });

    it("should update only the provided fields", async () => {
        const request = {
            id: "booking-123",
            status: "CHECKED_IN",
        };

        const updatedBooking: BookingData = {
            id: "booking-123",
            guestName: "John Doe",
            room: "101",
            reservationDate: new Date("2025-09-23T10:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "CHECKED_IN",
        };

        bookingsRepository.update.mockResolvedValueOnce(updatedBooking);

        const result = await updateBookingUseCase.execute(request);

        expect(bookingsRepository.update).toHaveBeenCalledWith("booking-123", { status: "CHECKED_IN" });
        expect(result!.status).toBe("CHECKED_IN");
    });
});