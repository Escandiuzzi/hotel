import { prisma } from "../../prisma";
import { BookingCreateData, BookingData, BookingsRepository } from "../bookings-repository";

export class PrismaBookingsRepository implements BookingsRepository {
    async create({ guestId, room, reservationDate, entryDate, departureDate, status }: BookingCreateData) {

        const guest = await prisma.guest.findUnique({
            where: { id: guestId },
        });


        if (!guest) {
            throw new Error("Guest not found");
        }

        await prisma.booking.create({
            data: {
                entryDate,
                departureDate,
                status,
                guest: {
                    connect: { id: guestId },
                },
                ...(room !== undefined ? { room } : {}),
                ...(reservationDate !== undefined ? { reservationDate } : {}),
            },
        });


        await prisma.booking.create({
            data: {
                entryDate,
                departureDate,
                status,
                guest: {
                    connect: { id: guestId },
                },
                ...(room !== undefined ? { room } : {}),
                ...(reservationDate !== undefined ? { reservationDate } : {}),
            },
        });
    }

    async getAll() {
        const bookings = await prisma.booking.findMany({
            select: {
                reservationDate: true,
                entryDate: true,
                departureDate: true,
                status: true,
                room: true,
                guest: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return bookings.map(b => ({
            guestName: b.guest.name,
            room: b.room,
            reservationDate: b.reservationDate,
            entryDate: b.entryDate,
            departureDate: b.departureDate,
            status: b.status
        })) as BookingData[];
    }
}