import { prisma } from "../../prisma";
import {
    GuestsRepository,
    GuestCreateData,
    GuestData,
} from "../guests-repository";

export class PrismaGuestsRepository implements GuestsRepository {
    async create({ name, phone, email, document, age }: GuestCreateData) {
        const { id } = await prisma.guest.create({
            data: { name, phone, email, document, age },
        });
        return id;
    }

    async update(
        id: string,
        data: Partial<GuestCreateData>
    ): Promise<GuestData | null> {
        const updatedGuest = await prisma.guest.update({
            where: { id },
            data,
        });
        return updatedGuest as GuestData;
    }

    async getAll(): Promise<GuestData[]> {
        const guests = await prisma.guest.findMany();
        return guests as GuestData[];
    }

    async getById(id: string): Promise<GuestData | null> {
        const guest = await prisma.guest.findUnique({ where: { id } });
        return guest as GuestData | null;
    }

    async getByCpf(cpf: string): Promise<GuestData | null> {
        const guest = await prisma.guest.findFirst({
            where: { document: cpf }
        });

        if (!guest) return null;

        return {
            id: guest.id,
            name: guest.name,
            age: guest.age,
            document: guest.document,
            phone: guest.phone,
            email: guest.email,
        };
    }
}