import { EmployeeGetAllData } from "./employees-repository";

export interface BookingCreateData {
    entryDate: string;
    departureDate: string;
    status: number;
}

export interface BookingGetAllData {
    entryDate: string;
    departureDate: string;
    status: number;
}

export interface BookingsRepository {
    create: (data: BookingCreateData) => Promise<void>;
    getAll: () => Promise<EmployeeGetAllData | null>;
}