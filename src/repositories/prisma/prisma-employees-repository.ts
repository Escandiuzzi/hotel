import { prisma } from "../../prisma";
import { EmployeeCreateData, EmployeeLoginData, EmployeeMinimalData, EmployeesRepository } from "../employees-repository";
import argon2 from "argon2";

export class PrismaEmployeesRepository implements EmployeesRepository {
    async create({ name, login, password }: EmployeeCreateData) {
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 65536 KiB
            timeCost: 3,
            parallelism: 1,
        });

        await prisma.employee.create({
            data: {
                name,
                login,
                password: hashedPassword,
            }
        });
    }
    async get({ login, password }: EmployeeLoginData): Promise<EmployeeMinimalData | null> {
        const employee = await prisma.employee.findUnique({
            where: { login },
            select: {
                name: true,
                login: true,
                password: true
            }
        });

        if (!employee) {
            return null;
        }

        const valid = await argon2.verify(employee.password, password);

        if (!valid) {
            return null;
        }

        return {
            name: employee.name,
            login: employee.login
        };
    }

    async getAll(): Promise<EmployeeMinimalData[]> {
        const employees = await prisma.employee.findMany({
            select: {
                name: true,
                login: true
            }
        });

        return employees as EmployeeMinimalData[];
    }
}