import { GuestsRepository } from "../../repositories/guests-repository";

interface GetGuestByCpfUseCaseRequest {
  cpf: string;
}

export class GetGuestByCpfUseCase {
  constructor(private guestsRepository: GuestsRepository) { }

  async execute({ cpf }: GetGuestByCpfUseCaseRequest) {
    if (!cpf) {
      throw new Error("CPF is required");
    }

    const guest = await this.guestsRepository.getByCpf(cpf);
    return guest;
  }
}