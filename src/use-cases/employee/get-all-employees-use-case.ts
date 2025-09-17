import { EmployeesRepository } from "../../repositories/employees-repository";

export class GetAllEmployeesUseCase {

    constructor(private employeesRepository: EmployeesRepository) { }

    async execute() {
        const employees = await this.employeesRepository.getAll();

        return employees;
    }
}