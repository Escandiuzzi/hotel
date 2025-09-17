import { prisma } from "../../prisma";
import { EmployeeCreateData, EmployeeGetAllData, EmployeesRepository } from "../employees-repository";
import crypto from "crypto";

export class PrismaEmployeesRepository implements EmployeesRepository {
    async create({ name, login, password }: EmployeeCreateData) {
        const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

        await prisma.employee.create({
            data: {
                name,
                login,
                password: hashedPassword,
            }
        });
    }

   async getAll(): Promise<EmployeeGetAllData[]> {
    const employees = await prisma.employee.findMany({
        select: {
            name: true,
            login: true
        }
    });

    return employees as EmployeeGetAllData[];
}
}