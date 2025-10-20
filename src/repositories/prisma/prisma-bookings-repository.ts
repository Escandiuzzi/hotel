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

        var { id } = await prisma.booking.create({
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

        return id;
    }

    async update(id: string, data: Partial<BookingCreateData>): Promise<BookingData | null> {
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                ...(data.guestId !== undefined ? { guest: { connect: { id: data.guestId } } } : {}),
                ...(data.room !== undefined ? { room: data.room } : {}),
                ...(data.reservationDate !== undefined ? { reservationDate: data.reservationDate } : {}),
                ...(data.entryDate !== undefined ? { entryDate: data.entryDate } : {}),
                ...(data.departureDate !== undefined ? { departureDate: data.departureDate } : {}),
                ...(data.status !== undefined ? { status: data.status } : {}),
            },
            include: {
                guest: true,
            },
        });

        return {
            id: updatedBooking.id,
            guestName: updatedBooking.guest.name,
            room: updatedBooking.room,
            reservationDate: updatedBooking.reservationDate,
            entryDate: updatedBooking.entryDate,
            departureDate: updatedBooking.departureDate,
            status: updatedBooking.status,
        } as BookingData;
    }

    async getAll() {
        const bookings = await prisma.booking.findMany({
            select: {
                id: true,
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

        return bookings.map((b: any) => ({
            id: b.id,
            guestName: b.guest.name,
            room: b.room,
            reservationDate: b.reservationDate,
            entryDate: b.entryDate,
            departureDate: b.departureDate,
            status: b.status
        })) as BookingData[];
    }
}