export interface GuestCreateData {
    name: string;
    phone: string;
    email: string;
    document: string;
    age: number;
}

export interface GuestData {
    id: string;
    name: string;
    phone: string;
    email: string;
    document: string;
    age: number | null;
}

export interface GuestsRepository {
    create: (data: GuestCreateData) => Promise<string>;
    update: (
        id: string,
        data: Partial<GuestCreateData>
    ) => Promise<GuestData | null>;
    getAll: () => Promise<GuestData[]>;
    getById: (id: string) => Promise<GuestData | null>;
    getByCpf: (cpf: string) => Promise<GuestData | null>;
}