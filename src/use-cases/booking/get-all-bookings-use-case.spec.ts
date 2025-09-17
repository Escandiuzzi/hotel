import { GetAllBookingsUseCase } from "./get-all-bookings-use-case";
import { BookingsRepository } from "../../repositories/bookings-repository";

describe("GetAllBookingsUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let getAllBookingsUseCase: GetAllBookingsUseCase;

    beforeEach(() => {
        bookingsRepository = {
            getAll: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<BookingsRepository>;

        getAllBookingsUseCase = new GetAllBookingsUseCase(bookingsRepository);
    });

    it("should return all bookings from the repository", async () => {
        const mockBookings = [
            {
                entryDate: new Date("2025-09-20T15:00:00.000Z"),
                departureDate: new Date("2025-09-25T11:00:00.000Z"),
                status: "confirmed",
            },
            {
                entryDate: new Date("2025-10-01T14:00:00.000Z"),
                departureDate: new Date("2025-10-05T12:00:00.000Z"),
                status: "pending",
            },
        ];

        bookingsRepository.getAll.mockResolvedValue(mockBookings);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalled();
        expect(result).toEqual(mockBookings);
    });

    it("should return an empty array if there are no bookings", async () => {
        bookingsRepository.getAll.mockResolvedValue([]);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});