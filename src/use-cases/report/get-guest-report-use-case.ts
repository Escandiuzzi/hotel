import { ReportRepository } from "../../repositories/report-repository";

export class GetGuestReportUseCase {
    constructor(private reportRepository: ReportRepository) { }

    async execute(cpf: string) {
        const result = await this.reportRepository.getGuestReportByCpf(cpf);

        if (!result) {
            throw new Error("Hóspede não encontrado.");
        }

        return result;
    }
}