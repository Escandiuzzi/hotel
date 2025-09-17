import { CreateEmployeeUseCase } from "./create-employee-use-case";
import { EmployeesRepository } from "../../repositories/employees-repository";

describe("CreateEmployeeUseCase", () => {
    let employeesRepository: jest.Mocked<EmployeesRepository>;
    let createEmployeeUseCase: CreateEmployeeUseCase;

    beforeEach(() => {
        employeesRepository = {
            create: jest.fn(),
            get: jest.fn(),
            getAll: jest.fn(),
        } as unknown as jest.Mocked<EmployeesRepository>;

        createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    });

    it("should create an employee when all fields are provided", async () => {
        const request = {
            name: "Alice Smith",
            login: "alicesmith",
            password: "SecurePass123",
        };

        await createEmployeeUseCase.execute(request);

        expect(employeesRepository.create).toHaveBeenCalledWith({
            name: request.name,
            login: request.login,
            password: request.password,
        });
    });

    it("should throw an error if name is missing", async () => {
        const request = {
            name: "",
            login: "user123",
            password: "password",
        };

        await expect(createEmployeeUseCase.execute(request)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should throw an error if login is missing", async () => {
        const request = {
            name: "Alice",
            login: "",
            password: "password",
        };

        await expect(createEmployeeUseCase.execute(request)).rejects.toThrow(
            "Login is required"
        );
    });

    it("should throw an error if password is missing", async () => {
        const request = {
            name: "Alice",
            login: "user123",
            password: "",
        };

        await expect(createEmployeeUseCase.execute(request)).rejects.toThrow(
            "Password is required"
        );
    });
});