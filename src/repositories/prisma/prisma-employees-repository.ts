import { prisma } from "../../prisma";
import { EmployeeCreateData, EmployeesRepository } from "../employees-repository";
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

    async getAll() {
        return await prisma.employee.findMany();
    }
}