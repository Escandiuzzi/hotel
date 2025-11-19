import { ReportRepository } from "../../repositories/report-repository";

export class GetBookingReportPeriodUseCase {
    constructor(private reportRepository: ReportRepository) { }

    async execute(from: string, to: string) {
        const start = new Date(from);
        const end = new Date(to);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Invalid date format");
        }

        return await this.reportRepository.getBookingReportByPeriod(start, end);
    }
}