import { prisma } from "../../prisma";
import { GuestsRepository, GuestCreateData, GuestData } from "../guests-repository";

export class PrismaGuestsRepository implements GuestsRepository {
    async create({ name, phone, email, document }: GuestCreateData) {
        var { id } = await prisma.guest.create({
            data: {
                name,
                phone,
                email,
                document
            }
        });

        return id
    }

    async update(id: string, data: Partial<GuestCreateData>): Promise<GuestData | null> {
        const updatedGuest = await prisma.guest.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                document: true
            }
        });

        return updatedGuest as GuestData;
    }

    async getAll() {
        var guests = await prisma.guest.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                document: true
            }
        });

        return guests as GuestData[];
    }
}