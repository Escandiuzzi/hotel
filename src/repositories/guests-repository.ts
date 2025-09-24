export interface GuestCreateData {
    name: string;
    phone: string;
    email: string;
    document: string;
}

export interface GuestData {
    id: string;
    name: string;
    phone: string;
    email: string;
    document: string;
}

export interface GuestsRepository {
    create: (data: GuestCreateData) => Promise<string>;
    getAll: () => Promise<GuestData[] | null>;
}