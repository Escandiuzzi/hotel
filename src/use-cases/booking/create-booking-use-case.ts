import { BookingsRepository } from "../../repositories/bookings-repository";

interface CreateBookingUseCaseRequest {
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export class CreateBookingUseCase {

    constructor(private bookingsRepository: BookingsRepository) { }

    async execute(request: CreateBookingUseCaseRequest) {
        const { entryDate, departureDate, status } = request;

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
            entryDate,
            departureDate,
            status
        });
    }
}