import { BookingsRepository } from "../../repositories/bookings-repository";

interface CreateBookingUseCaseRequest {
    guestId: string;
    room?: string;
    reservationDate?: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export class CreateBookingUseCase {

    constructor(private bookingsRepository: BookingsRepository) { }

    async execute(request: CreateBookingUseCaseRequest) {
        const { guestId, room, reservationDate, entryDate, departureDate, status } = request;

        if (!guestId) {
            throw new Error('Guest ID is required');
        }

        if (!entryDate) {
            throw new Error('Entry date is required');
        }

        if (!departureDate) {
            throw new Error('Departure date is required');
        }

        if (!status) {
            throw new Error('Status is required');
        }

        await this.bookingsRepository.create({
            guestId,
            room,
            reservationDate,
            entryDate,
            departureDate,
            status
        });
    }
}