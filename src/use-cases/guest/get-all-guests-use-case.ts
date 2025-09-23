import { GuestsRepository } from "../../repositories/guests-repository";

export class GetAllGuestsUseCase {

    constructor(private guestsRepository: GuestsRepository) { }

    async execute() {
        const guests = await this.guestsRepository.getAll();

        return guests;
    }
}