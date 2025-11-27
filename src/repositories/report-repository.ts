export interface ReportRepository {
    getGuestReportByCpf: (cpf: string) => Promise<any>;
    getBookingReportByPeriod: (from: Date, to: Date) => Promise<any[]>;
}
