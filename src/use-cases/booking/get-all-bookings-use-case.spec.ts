import { GetAllBookingsUseCase } from "./get-all-bookings-use-case";
import { BookingsRepository } from "../../repositories/bookings-repository";

describe("GetAllBookingsUseCase", () => {
    let bookingsRepository: jest.Mocked<BookingsRepository>;
    let getAllBookingsUseCase: GetAllBookingsUseCase;

    beforeEach(() => {
        bookingsRepository = {
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
        };
        getAllBookingsUseCase = new GetAllBookingsUseCase(bookingsRepository);
    });

    it("deve retornar todas as reservas do repositório", async () => {
        const mockBookings = [
            {
                id: "reserva-1",
                guestName: "Maria Silva",
                guestAge: 34,
                guestCpf: "123.456.789-00",
                guestPhone: "(11) 98765-4321",
                guestEmail: "maria.silva@email.com",
                roomType: "Suite",
                room: "101",
                reservationDate: new Date("2025-09-20T10:00:00Z"),
                entryDate: new Date("2025-09-25T14:00:00Z"),
                departureDate: new Date("2025-09-28T11:00:00Z"),
                status: "CONFIRMADA",
                services: [
                    {
                        serviceId: "servico-1",
                        serviceName: "Café da Manhã",
                        description: "Buffet completo com pães, frutas e sucos naturais",
                        price: 35.0,
                        quantity: 1,
                    },
                    {
                        serviceId: "servico-2",
                        serviceName: "Frigobar",
                        description: "Acesso ao frigobar do quarto",
                        price: 50.0,
                        quantity: 1,
                    },
                ],
            },
            {
                id: "reserva-2",
                guestName: "João Santos",
                guestAge: null,
                guestCpf: "987.654.321-00",
                roomType: "Suite",
                guestPhone: "(21) 99876-5432",
                guestEmail: "joao.santos@email.com",
                room: "202",
                reservationDate: new Date("2025-09-21T10:00:00Z"),
                entryDate: new Date("2025-09-26T14:00:00Z"),
                departureDate: new Date("2025-09-29T11:00:00Z"),
                status: "PENDENTE",
                services: [
                    {
                        serviceId: "servico-3",
                        serviceName: "Lavanderia",
                        description: "Serviço de lavagem e passagem de roupas",
                        price: 45.0,
                        quantity: 2,
                    },
                ],
            },
            {
                id: "reserva-3",
                guestName: "Ana Costa",
                guestAge: 28,
                guestCpf: "456.789.123-00",
                guestPhone: "(31) 97654-3210",
                guestEmail: "ana.costa@email.com",
                room: "305",
                roomType: "Suite",
                reservationDate: new Date("2025-09-22T09:00:00Z"),
                entryDate: new Date("2025-09-27T15:00:00Z"),
                departureDate: new Date("2025-09-30T12:00:00Z"),
                status: "CANCELADA",
                services: [],
            },
        ];

        bookingsRepository.getAll.mockResolvedValue(mockBookings);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockBookings);
    });

    it("deve retornar um array vazio se não existirem reservas", async () => {
        bookingsRepository.getAll.mockResolvedValue([]);

        const result = await getAllBookingsUseCase.execute();

        expect(bookingsRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});