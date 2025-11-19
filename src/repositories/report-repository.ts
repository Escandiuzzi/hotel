export interface ReportRepository {
    getGuestReport: (guestId: string) => Promise<any>;
    getBookingReportByPeriod: (from: Date, to: Date) => Promise<any[]>;
}
