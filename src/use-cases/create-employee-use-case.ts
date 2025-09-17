import { EmployeesRepository } from "../repositories/employees-repository";

interface CreateEmployeeUseCaseRequest {
    name: string;
    login: string;
    password: string;
}

export class CreateEmployeeUseCase {

    constructor(private employeesRepository: EmployeesRepository) {}

    async execute(request: CreateEmployeeUseCaseRequest) {
        const { name, login, password } = request;

        if(!name) {
            throw new Error('Name is required');
        }

        if(!login) {
            throw new Error('Login is required');
        }

        if(!password) {
            throw new Error('Password is required');
        }

        await this.employeesRepository.create({
            name,
            login,
            password
        });
    }
}