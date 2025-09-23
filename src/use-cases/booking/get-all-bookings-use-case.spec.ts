import { GetAllBookingsUseCase } from "./get-all-bookings-use-case";
import { BookingsRepository } from "../../repositories/bookings-repository";

describe("GetAllBookingsUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let getAllBookingsUseCase: GetAllBookingsUseCase;

    beforeEach(() => {
        bookingsRepository = {
            create: jest.fn(),
            getAll: jest.fn(),
        };
        getAllBookingsUseCase = new GetAllBookingsUseCase(bookingsRepository);
    });

    it("should return all bookings from the repository", async () => {
        const mockBookings = [
            {
                guestName: "Alice",
                room: "101",
                reservationDate: new Date("2025-09-20T10:00:00Z"),
                entryDate: new Date("2025-09-25T14:00:00Z"),
                departureDate: new Date("2025-09-28T11:00:00Z"),
                status: "CONFIRMED",
            },
            {
                guestName: "Bob",
                room: "202",
                reservationDate: new Date("2025-09-21T10:00:00Z"),
                entryDate: new Date("2025-09-26T14:00:00Z"),
                departureDate: new Date("2025-09-29T11:00:00Z"),
                status: "PENDING",
            },
        ];

        bookingsRepository.getAll.mockResolvedValue(mockBookings);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockBookings);
    });

    it("should return an empty array if no bookings exist", async () => {
        bookingsRepository.getAll.mockResolvedValue([]);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});