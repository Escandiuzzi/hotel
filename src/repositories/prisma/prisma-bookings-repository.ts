import { prisma } from "../../prisma";
import { BookingCreateData, BookingsRepository } from "../bookings-repository";

export class PrismaBookingsRepository implements BookingsRepository {
    async create({ entryDate, departureDate, status }: BookingCreateData) {
        await prisma.booking.create({
            data: {
                entryDate,
                departureDate,
                status
            }
        });
    }

    async getAll() {
        return await prisma.booking.findMany();
    }
}