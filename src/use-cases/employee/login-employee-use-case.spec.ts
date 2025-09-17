import { LoginEmployeeUseCase } from "./login-employee-use-case";
import { EmployeesRepository } from "../../repositories/employees-repository";

describe("LoginEmployeeUseCase", () => {
    let employeesRepository: jest.Mocked<EmployeesRepository>;
    let loginEmployeeUseCase: LoginEmployeeUseCase;

    beforeEach(() => {
        employeesRepository = {
            create: jest.fn(),
            get: jest.fn(),
            getAll: jest.fn(),
        } as unknown as jest.Mocked<EmployeesRepository>;

        loginEmployeeUseCase = new LoginEmployeeUseCase(employeesRepository);
    });

    it("should throw an error if login is missing", async () => {
        const request = { login: "", password: "password123" };

        await expect(loginEmployeeUseCase.execute(request)).rejects.toThrow(
            "Login is required"
        );
    });

    it("should throw an error if password is missing", async () => {
        const request = { login: "user123", password: "" };

        await expect(loginEmployeeUseCase.execute(request)).rejects.toThrow(
            "Password is required"
        );
    });

    it("should throw an error if credentials are invalid", async () => {
        const request = { login: "user123", password: "wrongpass" };

        employeesRepository.get.mockResolvedValue(null);

        await expect(loginEmployeeUseCase.execute(request)).rejects.toThrow(
            "Invalid credentials"
        );
    });

    it("should return employee data on successful login", async () => {
        const request = { login: "user123", password: "correctpass" };
        const mockEmployee = { name: "Alice Smith", login: "user123" };

        employeesRepository.get.mockResolvedValue(mockEmployee);

        const result = await loginEmployeeUseCase.execute(request);

        expect(employeesRepository.get).toHaveBeenCalledWith(request);
        expect(result).toEqual(mockEmployee);
    });
});