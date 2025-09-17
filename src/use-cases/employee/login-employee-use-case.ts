import { EmployeesRepository } from "../../repositories/employees-repository";

interface LoginEmployeeUseCaseRequest {
    login: string;
    password: string;
}

export class LoginEmployeeUseCase {

    constructor(private employeesRepository: EmployeesRepository) { }

    async execute(request: LoginEmployeeUseCaseRequest) {
        const { login, password } = request;

        if (!login) {
            throw new Error('Login is required');
        }

        if (!password) {
            throw new Error('Password is required');
        }

        const employee = await this.employeesRepository.get({
            login,
            password
        });

        console.log(employee);

        if (!employee) {
            throw new Error('Invalid credentials');
        }

        return employee;
    }
}