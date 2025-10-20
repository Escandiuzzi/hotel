export interface BookingServiceData {
    serviceId: string;
    serviceName: string;
    description: string | null;
    price: number;
    quantity: number;
}

export interface BookingCreateData {
    guestId: string;
    room?: string;
    roomType?: string;
    reservationDate?: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
    serviceIds?: string[];
}

export interface BookingData {
    id: string;
    guestName: string;
    guestAge: number | null;
    guestCpf: string | null;
    guestPhone: string | null;
    guestEmail: string | null;
    room: string;
    roomType: string;
    reservationDate: Date;
    entryDate: Date;
    departureDate: Date;
    status: string;
    services: BookingServiceData[];
}

export interface BookingsRepository {
    create: (data: BookingCreateData) => Promise<string>;
    update: (
        id: string,
        data: Partial<BookingCreateData>
    ) => Promise<BookingData | null>;
    getAll: () => Promise<BookingData[]>;
    getById: (id: string) => Promise<BookingData | null>;
}