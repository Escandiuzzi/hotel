import { prisma } from "../../prisma";
import { BookingCreateData, BookingData, BookingsRepository } from "../bookings-repository";

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
        var bookings = await prisma.booking.findMany({
            select: {
                entryDate: true,
                departureDate: true,
                status: true
            }
        });

        return bookings as BookingData[];
    }
}