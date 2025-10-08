import { GuestData, GuestsRepository } from "../../repositories/guests-repository";

interface UpdateGuestUseCaseRequest {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    document?: string;
}

export class UpdateGuestUseCase {

    constructor(private guestsRepository: GuestsRepository) { }

    async execute(request: UpdateGuestUseCaseRequest): Promise<GuestData | null> {
        const { id, name, phone, email, document } = request;

        if (!id) {
            throw new Error("Guest ID is required");
        }

        const data = {} as Partial<GuestData>;

        if (name !== undefined) data.name = name;
        if (phone !== undefined) data.phone = phone;
        if (email !== undefined) data.email = email;
        if (document !== undefined) data.document = document;

        const updatedGuest = await this.guestsRepository.update(id, data);

        if (!updatedGuest) {
            throw new Error("Guest not found");
        }

        return updatedGuest;
    }
}