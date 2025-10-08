export interface BookingCreateData {
    guestId: string;
    room: string | undefined;
    reservationDate: Date | undefined;
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export interface BookingData {
    id: string;
    guestName: string;
    room: string;
    reservationDate: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export interface BookingsRepository {
    create: (data: BookingCreateData) => Promise<string>;
    update: (id: string, data: Partial<BookingCreateData>) => Promise<BookingData | null>;
    getAll: () => Promise<BookingData[] | null>;
}