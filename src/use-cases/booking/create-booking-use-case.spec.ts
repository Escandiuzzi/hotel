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
            getById: jest.fn(),
        };
        createBookingUseCase = new CreateBookingUseCase(bookingsRepository);
    });

    it("deve criar uma reserva com dados válidos", async () => {
        const request = {
            guestId: "hospede-123",
            room: "101",
            reservationDate: new Date("2025-09-23T10:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "CONFIRMADA",
        };

        bookingsRepository.create.mockResolvedValueOnce("reserva-123");

        const result = await createBookingUseCase.execute(request);

        expect(bookingsRepository.create).toHaveBeenCalledWith({
            guestId: "hospede-123",
            entryDate: request.entryDate,
            departureDate: request.departureDate,
            status: "CONFIRMADA",
            room: "101",
            reservationDate: request.reservationDate,
        });
        expect(bookingsRepository.create).toHaveBeenCalledTimes(1);
        expect(result).toBe("reserva-123");
    });

    it("deve criar uma reserva com serviços inclusos", async () => {
        const request = {
            guestId: "hospede-456",
            room: "202",
            reservationDate: new Date("2025-10-01T09:00:00Z"),
            entryDate: new Date("2025-10-05T15:00:00Z"),
            departureDate: new Date("2025-10-10T12:00:00Z"),
            status: "CONFIRMADA",
            serviceIds: ["servico-1", "servico-2", "servico-3"],
        };

        bookingsRepository.create.mockResolvedValueOnce("reserva-456");

        const result = await createBookingUseCase.execute(request);

        expect(bookingsRepository.create).toHaveBeenCalledWith({
            guestId: "hospede-456",
            entryDate: request.entryDate,
            departureDate: request.departureDate,
            status: "CONFIRMADA",
            room: "202",
            reservationDate: request.reservationDate,
            serviceIds: ["servico-1", "servico-2", "servico-3"],
        });
        expect(bookingsRepository.create).toHaveBeenCalledTimes(1);
        expect(result).toBe("reserva-456");
    });

    it("deve lançar erro se o ID do hóspede estiver faltando", async () => {
        const request: any = {
            entryDate: new Date(),
            departureDate: new Date(),
            status: "CONFIRMADA",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Guest ID is required"
        );

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a data de entrada estiver faltando", async () => {
        const request: any = {
            guestId: "hospede-123",
            departureDate: new Date(),
            status: "CONFIRMADA",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Entry date is required"
        );

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a data de saída estiver faltando", async () => {
        const request: any = {
            guestId: "hospede-123",
            entryDate: new Date(),
            status: "CONFIRMADA",
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Departure date is required"
        );

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se o status estiver faltando", async () => {
        const request: any = {
            guestId: "hospede-123",
            entryDate: new Date(),
            departureDate: new Date(),
        };

        await expect(createBookingUseCase.execute(request)).rejects.toThrow(
            "Status is required"
        );

        expect(bookingsRepository.create).not.toHaveBeenCalled();
    });
});