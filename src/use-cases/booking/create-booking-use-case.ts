import { BookingsRepository } from "../../repositories/bookings-repository";

interface CreateBookingUseCaseRequest {
    guestId: string;
    room?: string;
    roomType?: string;
    reservationDate?: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
    serviceIds?: string[];
}

export class CreateBookingUseCase {
    constructor(private bookingsRepository: BookingsRepository) { }

    async execute(request: CreateBookingUseCaseRequest) {
        const {
            guestId,
            room,
            reservationDate,
            entryDate,
            departureDate,
            status,
            roomType,
            serviceIds,
        } = request;

        if (!guestId) {
            throw new Error("Guest ID is required");
        }

        if (!entryDate) {
            throw new Error("Entry date is required");
        }

        if (!departureDate) {
            throw new Error("Departure date is required");
        }

        if (!status) {
            throw new Error("Status is required");
        }

        const id = await this.bookingsRepository.create({
            guestId,
            entryDate,
            departureDate,
            status,
            ...(room !== undefined && { room }),
            ...(roomType !== undefined && { roomType }),
            ...(reservationDate !== undefined && { reservationDate }),
            ...(serviceIds !== undefined && { serviceIds }),
        });

        return id;
    }
}