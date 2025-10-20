import { BookingsRepository } from "../../repositories/bookings-repository";

interface UpdateBookingUseCaseRequest {
    id: string;
    guestId?: string;
    room?: string;
    roomType?: string;
    reservationDate?: Date;
    entryDate?: Date;
    departureDate?: Date;
    status?: string;
    serviceIds?: string[];
}

export class UpdateBookingUseCase {
    constructor(private bookingsRepository: BookingsRepository) { }

    async execute(request: UpdateBookingUseCaseRequest) {
        const {
            id,
            guestId,
            room,
            roomType,
            reservationDate,
            entryDate,
            departureDate,
            status,
            serviceIds,
        } = request;

        if (!id) {
            throw new Error("Booking ID is required");
        }

        const existingBooking = await this.bookingsRepository.getById(id);
        if (!existingBooking) {
            throw new Error("Booking not found");
        }

        const updatedBooking = await this.bookingsRepository.update(id, {
            ...(guestId !== undefined && { guestId }),
            ...(room !== undefined && { room }),
            ...(roomType !== undefined && { roomType }),
            ...(reservationDate !== undefined && { reservationDate }),
            ...(entryDate !== undefined && { entryDate }),
            ...(departureDate !== undefined && { departureDate }),
            ...(status !== undefined && { status }),
            ...(serviceIds !== undefined && { serviceIds }),
        });

        return updatedBooking;
    }
}