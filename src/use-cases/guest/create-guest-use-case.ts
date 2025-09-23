import { GuestsRepository } from "../../repositories/guests-repository";

interface CreateGuestUseCaseRequest {
    name: string;
    phone: string;
    email: string;
    document: string;
}

export class CreateGuestUseCase {

    constructor(private guestsRepository: GuestsRepository) { }

    async execute(request: CreateGuestUseCaseRequest) {
        const { name, phone, email, document } = request;

        if (!name) {
            throw new Error('Name is required');
        }

        if (!phone) {
            throw new Error('Phone is required');
        }

        if (!email) {
            throw new Error('Email is required');
        }

        if (!document) {
            throw new Error('Document is required');
        }

        return await this.guestsRepository.create({
            name,
            phone,
            email,
            document
        });
    }
}