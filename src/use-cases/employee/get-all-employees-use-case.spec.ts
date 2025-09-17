import { GetAllEmployeesUseCase } from "./get-all-employees-use-case";
import { EmployeesRepository } from "../../repositories/employees-repository";

describe("GetAllEmployeesUseCase", () => {
    let employeesRepository: jest.Mocked<EmployeesRepository>;
    let getAllEmployeesUseCase: GetAllEmployeesUseCase;

    beforeEach(() => {
        employeesRepository = {
            create: jest.fn(),
            get: jest.fn(),
            getAll: jest.fn(),
        } as unknown as jest.Mocked<EmployeesRepository>;

        getAllEmployeesUseCase = new GetAllEmployeesUseCase(employeesRepository);
    });

    it("should return all employees from the repository", async () => {
        const mockEmployees = [
            { name: "Alice Smith", login: "alicesmith" },
            { name: "Bob Johnson", login: "bobjohnson" },
        ];

        employeesRepository.getAll.mockResolvedValue(mockEmployees);

        const result = await getAllEmployeesUseCase.execute();

        expect(employeesRepository.getAll).toHaveBeenCalled();
        expect(result).toEqual(mockEmployees);
    });

    it("should return an empty array if no employees exist", async () => {
        employeesRepository.getAll.mockResolvedValue([]);

        const result = await getAllEmployeesUseCase.execute();

        expect(employeesRepository.getAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});