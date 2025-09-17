export interface BookingCreateData {
    entryDate: Date;
    departureDate: Date;
    status: string;
}

export interface BookingData {
    entryDate: Date;
    departureDate: Date;
    status: string;
}


export interface BookingsRepository {
    create: (data: BookingCreateData) => Promise<void>;
    getAll: () => Promise<BookingData[] | null>;
}