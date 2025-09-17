import express from 'express';

import { PrismaEmployeesRepository } from './repositories/prisma/prisma-employees-repository';
import { PrismaBookingsRepository } from './repositories/prisma/prisma-bookings-repository';

import { CreateEmployeeUseCase } from './use-cases/create-employee-use-case';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello World!')
})

routes.post('/emplyoyees', async (req, res) => {

  const { name, login, password } = req.body;

  const prismaRepository = new PrismaEmployeesRepository();

  const createEmployeeUseCase = new CreateEmployeeUseCase(prismaRepository);

  await createEmployeeUseCase.execute({ name, login, password });
  
  return res.status(201).send();
});