import { BookingsRepository } from "../../repositories/bookings-repository";
import { BookingData, BookingCreateData } from "../../repositories/bookings-repository";

interface UpdateBookingUseCaseRequest {
    id: string;
    guestId?: string;
    room?: string;
    reservationDate?: Date;
    entryDate?: Date;
    departureDate?: Date;
    status?: string;
}

export class UpdateBookingUseCase {
    constructor(private bookingsRepository: BookingsRepository) { }

    async execute(request: UpdateBookingUseCaseRequest): Promise<BookingData | null> {
        const { id, guestId, room, reservationDate, entryDate, departureDate, status } = request;

        if (!id) {
            throw new Error("Booking ID is required");
        }

        const data: Partial<BookingCreateData> = {};

        if (guestId !== undefined) data.guestId = guestId;
        if (room !== undefined) data.room = room;
        if (reservationDate !== undefined) data.reservationDate = reservationDate;
        if (entryDate !== undefined) data.entryDate = entryDate;
        if (departureDate !== undefined) data.departureDate = departureDate;
        if (status !== undefined) data.status = status;

        const updatedBooking = await this.bookingsRepository.update(id, data);

        if (!updatedBooking) {
            throw new Error("Booking not found");
        }

        return updatedBooking;
    }
}
