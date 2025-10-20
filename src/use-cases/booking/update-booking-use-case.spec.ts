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
            getById: jest.fn(),
        } as unknown as jest.Mocked<BookingsRepository>;

        updateBookingUseCase = new UpdateBookingUseCase(bookingsRepository);
    });

    it("deve atualizar uma reserva com sucesso quando dados válidos são fornecidos", async () => {
        const request = {
            id: "reserva-123",
            guestId: "hospede-123",
            room: "101",
            reservationDate: new Date("2025-09-23T10:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "CONFIRMADA",
        };

        const existingBooking: BookingData = {
            id: "reserva-123",
            guestName: "Carlos Mendes",
            guestAge: 42,
            guestCpf: "234.567.890-11",
            guestPhone: "(41) 98765-1234",
            guestEmail: "carlos.mendes@email.com",
            room: "102",
            roomType: "Standard",
            reservationDate: new Date("2025-09-20T10:00:00Z"),
            entryDate: new Date("2025-09-23T14:00:00Z"),
            departureDate: new Date("2025-09-26T11:00:00Z"),
            status: "PENDENTE",
            services: [],
        };

        const updatedBooking: BookingData = {
            ...existingBooking,
            room: "101",
            roomType: "Deluxe",
            reservationDate: request.reservationDate!,
            entryDate: request.entryDate!,
            departureDate: request.departureDate!,
            status: "CONFIRMADA",
            services: [
                {
                    serviceId: "servico-1",
                    serviceName: "Café da Manhã",
                    description: "Buffet completo",
                    price: 35.0,
                    quantity: 1,
                },
            ],
        };

        bookingsRepository.getById.mockResolvedValueOnce(existingBooking);
        bookingsRepository.update.mockResolvedValueOnce(updatedBooking);

        const result = await updateBookingUseCase.execute(request);

        expect(bookingsRepository.getById).toHaveBeenCalledWith("reserva-123");
        expect(result!).toEqual(updatedBooking);
        expect(bookingsRepository.update).toHaveBeenCalledWith("reserva-123", {
            guestId: "hospede-123",
            room: "101",
            reservationDate: request.reservationDate,
            entryDate: request.entryDate,
            departureDate: request.departureDate,
            status: "CONFIRMADA",
        });
    });

    it("deve atualizar uma reserva adicionando serviços", async () => {
        const request = {
            id: "reserva-456",
            serviceIds: ["servico-2", "servico-3"],
        };

        const existingBooking: BookingData = {
            id: "reserva-456",
            guestName: "Fernanda Lima",
            guestAge: 29,
            guestCpf: "345.678.901-22",
            guestPhone: "(51) 97654-3210",
            guestEmail: "fernanda.lima@email.com",
            room: "203",
            roomType: "Deluxe",
            reservationDate: new Date("2025-10-01T10:00:00Z"),
            entryDate: new Date("2025-10-05T14:00:00Z"),
            departureDate: new Date("2025-10-08T11:00:00Z"),
            status: "CONFIRMADA",
            services: [],
        };

        const updatedBooking: BookingData = {
            ...existingBooking,
            services: [
                {
                    serviceId: "servico-2",
                    serviceName: "Frigobar",
                    description: "Acesso completo ao frigobar",
                    price: 50.0,
                    quantity: 1,
                },
                {
                    serviceId: "servico-3",
                    serviceName: "Lavanderia",
                    description: "Lavagem e passagem de roupas",
                    price: 45.0,
                    quantity: 1,
                },
            ],
        };

        bookingsRepository.getById.mockResolvedValueOnce(existingBooking);
        bookingsRepository.update.mockResolvedValueOnce(updatedBooking);

        const result = await updateBookingUseCase.execute(request);

        expect(bookingsRepository.getById).toHaveBeenCalledWith("reserva-456");
        expect(result!.services).toHaveLength(2);
        expect(bookingsRepository.update).toHaveBeenCalledWith("reserva-456", {
            serviceIds: ["servico-2", "servico-3"],
        });
    });

    it("deve lançar erro se o ID da reserva estiver faltando", async () => {
        const request: any = {
            guestId: "hospede-123",
            status: "CONFIRMADA",
        };

        await expect(updateBookingUseCase.execute(request)).rejects.toThrow(
            "Booking ID is required"
        );

        expect(bookingsRepository.getById).not.toHaveBeenCalled();
        expect(bookingsRepository.update).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a reserva não for encontrada", async () => {
        const request = {
            id: "reserva-404",
            status: "CANCELADA",
        };

        bookingsRepository.getById.mockResolvedValueOnce(null);

        await expect(updateBookingUseCase.execute(request)).rejects.toThrow(
            "Booking not found"
        );

        expect(bookingsRepository.getById).toHaveBeenCalledWith("reserva-404");
        expect(bookingsRepository.update).not.toHaveBeenCalled();
    });

    it("deve atualizar apenas os campos fornecidos", async () => {
        const request = {
            id: "reserva-789",
            status: "CHECK-IN REALIZADO",
        };

        const existingBooking: BookingData = {
            id: "reserva-789",
            guestName: "Roberto Alves",
            guestAge: 55,
            guestCpf: "456.789.012-33",
            guestPhone: "(61) 99876-5432",
            guestEmail: "roberto.alves@email.com",
            room: "305",
            roomType: "Suite",
            reservationDate: new Date("2025-09-20T09:00:00Z"),
            entryDate: new Date("2025-09-25T14:00:00Z"),
            departureDate: new Date("2025-09-28T11:00:00Z"),
            status: "PENDENTE",
            services: [],
        };

        const updatedBooking: BookingData = {
            ...existingBooking,
            status: "CHECK-IN REALIZADO",
        };

        bookingsRepository.getById.mockResolvedValueOnce(existingBooking);
        bookingsRepository.update.mockResolvedValueOnce(updatedBooking);

        const result = await updateBookingUseCase.execute(request);

        expect(bookingsRepository.getById).toHaveBeenCalledWith("reserva-789");
        expect(bookingsRepository.update).toHaveBeenCalledWith("reserva-789", {
            status: "CHECK-IN REALIZADO",
        });
        expect(result!.status).toBe("CHECK-IN REALIZADO");
    });
});