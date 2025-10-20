export interface EmployeeCreateData {
    name: string;
    login: string;
    password: string;
}

export interface EmployeeLoginData {
    login: string;
    password: string;
}

export interface EmployeeMinimalData {
    name: string;
    login: string;
}

export interface EmployeesRepository {
    create: (data: EmployeeCreateData) => Promise<void>;
    get: (data: EmployeeLoginData) => Promise<EmployeeMinimalData | null>;
    getAll: () => Promise<EmployeeMinimalData[]>;
}