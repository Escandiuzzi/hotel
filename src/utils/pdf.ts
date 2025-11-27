import PDFDocument from "pdfkit";
import { Response } from "express";

// Paleta e tipografia inspiradas no front-end (verde suave e estilo organizado)
const THEME = {
    primary: "#2E7D32", // verde mais escuro
    secondary: "#4CAF50",
    divider: "#C8E6C9",
};

export function guestReportPDF(res: Response, guest: any) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio-hospede.pdf");

    doc.pipe(res);

    // Cabeçalho
    doc
        .fontSize(22)
        .fillColor(THEME.primary)
        .text("Relatório do Hóspede", { align: "center", underline: true });
    doc.moveDown(1.5);

    doc
        .fontSize(16)
        .fillColor("black")
        .text(`Nome: ${guest.name}`)
        .text(`E-mail: ${guest.email || "-"}`)
        .text(`Telefone: ${guest.phone || "-"}`)
        .text(`CPF: ${guest.document || "-"}`)
        .text(`Idade: ${guest.age ?? "Não informado"}`);

    doc.moveDown(1);
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor(THEME.divider)
        .stroke();
    doc.moveDown(1.5);

    // Reservas
    doc
        .fontSize(18)
        .fillColor(THEME.secondary)
        .text("Reservas Realizadas:", { underline: true });
    doc.moveDown(0.8);

    if (!guest.bookings?.length) {
        doc.fontSize(12).fillColor("gray").text("Nenhuma reserva encontrada.");
    } else {
        guest.bookings.forEach((booking: any, i: number) => {
            doc
                .moveDown(0.8)
                .fontSize(14)
                .fillColor(THEME.primary)
                .text(`Reserva #${i + 1}`, { continued: false })
                .fontSize(12)
                .fillColor("black")
                .text(`Quarto: ${booking.room}`)
                .text(`Entrada: ${booking.entryDate}`)
                .text(`Saída: ${booking.departureDate}`)
                .text(`Status: ${booking.status}`);

            doc.moveDown(0.4).fontSize(13).fillColor(THEME.secondary).text("Serviços:");

            if (booking.services?.length) {
                booking.services.forEach((bs: any) => {
                    doc
                        .fontSize(12)
                        .fillColor("black")
                        .text(`• ${bs.service.name} — R$ ${bs.service.price.toFixed(2)} × ${bs.quantity}`);
                });
            } else {
                doc.fontSize(12).fillColor("gray").text("Nenhum serviço registrado.");
            }

            doc.moveDown(0.8);
            doc
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor(THEME.divider)
                .stroke();
        });
    }

    doc.end();
}

export function bookingPeriodPDF(res: Response, bookings: any[], from: string, to: string) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio-periodo.pdf");

    doc.pipe(res);

    // Cabeçalho
    doc
        .fontSize(22)
        .fillColor(THEME.primary)
        .text("Relatório de Reservas por Período", { align: "center", underline: true });
    doc.moveDown(1);

    doc
        .fontSize(14)
        .fillColor("black")
        .text(`Período: ${from} até ${to}`)
        .moveDown(0.5);

    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor(THEME.divider)
        .stroke();
    doc.moveDown(1);

    let totalRevenue = 0;

    if (!bookings?.length) {
        doc.fontSize(12).fillColor("gray").text("Nenhuma reserva encontrada neste período.");
    } else {
        bookings.forEach((b: any, i: number) => {
            doc
                .fontSize(16)
                .fillColor(THEME.primary)
                .text(`Reserva #${i + 1}`)
                .fontSize(12)
                .fillColor("black")
                .text(`Hóspede: ${b.guest.name}`)
                .text(`Quarto: ${b.room}`)
                .text(`Entrada: ${b.entryDate}`)
                .text(`Saída: ${b.departureDate}`)
                .text(`Status: ${b.status}`);

            doc.moveDown(0.5).fontSize(13).fillColor(THEME.secondary).text("Serviços:");

            if (b.services?.length) {
                b.services.forEach((bs: any) => {
                    const subtotal = bs.service.price * bs.quantity;
                    totalRevenue += subtotal;
                    doc
                        .fontSize(12)
                        .fillColor("black")
                        .text(
                            `• ${bs.service.name} — R$ ${bs.service.price.toFixed(2)} × ${bs.quantity} = R$ ${subtotal.toFixed(
                                2
                            )}`
                        );
                });
            } else {
                doc.fontSize(12).fillColor("gray").text("Nenhum serviço registrado.");
            }

            doc.moveDown(0.8);
            doc
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor(THEME.divider)
                .stroke();
            doc.moveDown(0.6);
        });
    }

    doc
        .moveDown(1)
        .fontSize(16)
        .fillColor(THEME.primary)
        .text(`Receita Total: R$ ${totalRevenue.toFixed(2)}`, {
            align: "right",
        });

    doc.end();
}