import { prisma } from "../../prisma";
import {
    BookingCreateData,
    BookingData,
    BookingsRepository,
} from "../bookings-repository";

export class PrismaBookingsRepository implements BookingsRepository {
    async create({
        guestId,
        room,
        roomType,
        reservationDate,
        entryDate,
        departureDate,
        status,
        serviceIds = [],
    }: BookingCreateData) {
        const guest = await prisma.guest.findUnique({ where: { id: guestId } });
        if (!guest) throw new Error("Guest not found");

        const { id } = await prisma.booking.create({
            data: {
                entryDate,
                departureDate,
                status,
                guest: { connect: { id: guestId } },
                ...(room && { room }),
                ...(roomType && { roomType }),
                ...(reservationDate && { reservationDate }),
                services: {
                    create: serviceIds.map((serviceId) => ({
                        service: { connect: { id: serviceId } },
                    })),
                },
            },
        });
        return id;
    }

    async update(
        id: string,
        data: Partial<BookingCreateData>
    ): Promise<BookingData | null> {
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                ...(data.guestId && { guest: { connect: { id: data.guestId } } }),
                ...(data.room !== undefined && { room: data.room }),
                ...(data.roomType !== undefined && { roomType: data.roomType }),
                ...(data.reservationDate !== undefined && {
                    reservationDate: data.reservationDate,
                }),
                ...(data.entryDate && { entryDate: data.entryDate }),
                ...(data.departureDate && { departureDate: data.departureDate }),
                ...(data.status && { status: data.status }),
                ...(data.serviceIds && {
                    services: {
                        deleteMany: {},
                        create: data.serviceIds.map((serviceId) => ({
                            service: { connect: { id: serviceId } },
                        })),
                    },
                }),
            },
            include: { guest: true, services: { include: { service: true } } },
        });

        return this.mapToBookingData(updatedBooking);
    }

    private mapToBookingData(booking: any): BookingData {
        return {
            id: booking.id,
            guestName: booking.guest.name,
            guestAge: booking.guest.age,
            guestCpf: booking.guest.document,
            guestPhone: booking.guest.phone,
            guestEmail: booking.guest.email,
            room: booking.room || "",
            roomType: booking.roomType || "",
            reservationDate: booking.reservationDate,
            entryDate: booking.entryDate,
            departureDate: booking.departureDate,
            status: booking.status,
            services: booking.services.map((bs: any) => ({
                serviceId: bs.service.id,
                serviceName: bs.service.name,
                description: bs.service.description,
                price: bs.service.price,
                quantity: bs.quantity,
            })),
        };
    }

    async getAll(): Promise<BookingData[]> {
        const bookings = await prisma.booking.findMany({
            include: { guest: true, services: { include: { service: true } } },
        });
        return bookings.map((b) => this.mapToBookingData(b));
    }

    async getById(id: string): Promise<BookingData | null> {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { guest: true, services: { include: { service: true } } },
        });
        if (!booking) return null;
        return this.mapToBookingData(booking);
    }


}