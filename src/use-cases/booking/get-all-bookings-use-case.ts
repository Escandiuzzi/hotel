import { BookingsRepository } from "../../repositories/bookings-repository";

export class GetAllBookingsUseCase {
    constructor(private bookingsRepository: BookingsRepository) { }

    async execute() {
        const bookings = await this.bookingsRepository.getAll();
        return bookings;
    }
}