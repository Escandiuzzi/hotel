export interface EmployeeCreateData {
    name: string;
    login: string;
    password: string;
}

export interface EmployeeGetAllData {
    name: string;
    login: string;
}

export interface EmployeesRepository {
    create: (data : EmployeeCreateData) => Promise<void>;
    getAll: () => Promise<EmployeeGetAllData | null>;
}