import {
    GuestsRepository,
    GuestData,
    GuestCreateData,
} from "../../repositories/guests-repository";

interface UpdateGuestUseCaseRequest {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    document?: string;
    age?: number;
}

export class UpdateGuestUseCase {
    constructor(private guestsRepository: GuestsRepository) { }

    async execute(
        request: UpdateGuestUseCaseRequest
    ): Promise<GuestData | null> {
        const { id, name, phone, email, document, age } = request;

        if (!id) {
            throw new Error("Guest ID is required");
        }

        const data: Partial<GuestCreateData> = {};

        if (name !== undefined) data.name = name;
        if (phone !== undefined) data.phone = phone;
        if (email !== undefined) data.email = email;
        if (document !== undefined) data.document = document;
        if (age !== undefined) data.age = age;

        const updatedGuest = await this.guestsRepository.update(id, data);

        if (!updatedGuest) {
            throw new Error("Guest not found");
        }

        return updatedGuest;
    }
}