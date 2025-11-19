// utils/pdf.ts
import PDFDocument from "pdfkit";
import { Response } from "express";

export function guestReportPDF(res: Response, guest: any) {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=guest-report.pdf");

    doc.pipe(res);

    doc.fontSize(22).text("Guest Report", { underline: true });
    doc.moveDown();

    doc.fontSize(16).text(`Name: ${guest.name}`);
    doc.text(`Email: ${guest.email}`);
    doc.text(`Phone: ${guest.phone}`);
    doc.text(`Document: ${guest.document}`);
    doc.text(`Age: ${guest.age ?? "N/A"}`);

    doc.moveDown().fontSize(18).text("Bookings:");

    guest.bookings.forEach((booking: any, i: number) => {
        doc.moveDown().fontSize(14).text(`Booking #${i + 1}`);
        doc.text(`Room: ${booking.room}`);
        doc.text(`Entry: ${booking.entryDate}`);
        doc.text(`Departure: ${booking.departureDate}`);
        doc.text(`Status: ${booking.status}`);

        doc.text("Services:");
        booking.services.forEach((bs: any) => {
            doc.text(
                `  ${bs.service.name} - $${bs.service.price} x ${bs.quantity}`
            );
        });
    });

    doc.end();
}

export function bookingPeriodPDF(res: Response, bookings: any[], from: string, to: string) {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=period-report.pdf");

    doc.pipe(res);

    doc.fontSize(22).text("Booking Report (Period)", { underline: true });
    doc.text(`From: ${from}`);
    doc.text(`To: ${to}`);
    doc.moveDown();

    let totalRevenue = 0;

    bookings.forEach((b: any, i: number) => {
        doc.fontSize(16).text(`Booking #${i + 1}`);
        doc.text(`Guest: ${b.guest.name}`);
        doc.text(`Room: ${b.room}`);
        doc.text(`Entry: ${b.entryDate}`);
        doc.text(`Departure: ${b.departureDate}`);
        doc.text(`Status: ${b.status}`);

        doc.text("Services:");

        b.services.forEach((bs: any) => {
            const subtotal = bs.service.price * bs.quantity;
            totalRevenue += subtotal;

            doc.text(
                `  ${bs.service.name} - $${bs.service.price} x ${bs.quantity} = $${subtotal}`
            );
        });

        doc.moveDown();
    });

    doc.fontSize(18).text(`Total Revenue: $${totalRevenue}`);

    doc.end();
}