import { prisma } from "../../prisma";
import { ReportRepository } from "../report-repository";

export class PrismaReportRepository implements ReportRepository {
    async getGuestReportByCpf(cpf: string) {
        return await prisma.guest.findUnique({
            where: { document: cpf },
            include: {
                bookings: {
                    include: {
                        services: {
                            include: { service: true },
                        },
                    },
                },
            },
        });
    }
    async getBookingReportByPeriod(from: Date, to: Date) {
        const bookings = await prisma.booking.findMany({
            where: {
                entryDate: { gte: from },
                departureDate: { lte: to }
            },
            include: {
                guest: true,
                services: { include: { service: true } }
            }
        });

        return bookings;
    }
}
