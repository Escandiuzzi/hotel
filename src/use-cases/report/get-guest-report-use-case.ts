import { ReportRepository } from "../../repositories/report-repository";

export class GetGuestReportUseCase {
    constructor(private reportRepository: ReportRepository) { }

    async execute(guestId: string) {
        const result = await this.reportRepository.getGuestReport(guestId);

        if (!result) {
            throw new Error("Guest not found");
        }

        return result;
    }
}