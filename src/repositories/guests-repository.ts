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
    update: (id: string, data: Partial<GuestCreateData>) => Promise<GuestData | null>;
    getAll: () => Promise<GuestData[] | null>;
}