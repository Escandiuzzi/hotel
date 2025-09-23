export interface BookingCreateData {
    guestId: string;
    room: string | undefined;
    reservationDate: Date | undefined;
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export interface BookingData {
    guestName: string;
    room: string;
    reservationDate: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export interface BookingsRepository {
    create: (data: BookingCreateData) => Promise<void>;
    getAll: () => Promise<BookingData[] | null>;
}