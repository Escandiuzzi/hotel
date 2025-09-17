import express from 'express';

import { PrismaEmployeesRepository } from './repositories/prisma/prisma-employees-repository';
import { PrismaBookingsRepository } from './repositories/prisma/prisma-bookings-repository';

import { CreateBookingUseCase } from './use-cases/booking/create-booking-use-case';
import { GetAllBookingsUseCase } from './use-cases/booking/get-all-bookings-use-case';

import { CreateEmployeeUseCase } from './use-cases/employee/create-employee-use-case';
import { LoginEmployeeUseCase } from './use-cases/employee/login-employee-use-case';
import { GetAllEmployeesUseCase } from './use-cases/employee/get-all-employees-use-case';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello World! - Hotel API');
})

routes.post('/employees', async (req, res) => {

  const { name, login, password } = req.body;

  const prismaRepository = new PrismaEmployeesRepository();

  const createEmployeeUseCase = new CreateEmployeeUseCase(prismaRepository);

  await createEmployeeUseCase.execute({ name, login, password });

  return res.status(201).send();
});

routes.post('/employees/login', async (req, res) => {

  const { login, password } = req.body;

  const prismaRepository = new PrismaEmployeesRepository();

  const loginEmployeeUseCase = new LoginEmployeeUseCase(prismaRepository);

  var result = await loginEmployeeUseCase.execute({ login, password });

  return res.status(201).send(result);
});

routes.get('/employees', async (req, res) => {

  const prismaRepository = new PrismaEmployeesRepository();

  const createEmployeeUseCase = new GetAllEmployeesUseCase(prismaRepository);

  var result = await createEmployeeUseCase.execute();

  return res.status(200).send(result);
});

routes.post('/bookings', async (req, res) => {

  const { entryDate, departureDate, status } = req.body;

  const prismaRepository = new PrismaBookingsRepository();

  const createBookingUseCase = new CreateBookingUseCase(prismaRepository);

  await createBookingUseCase.execute({ entryDate, departureDate, status });

  return res.status(201).send();
});

routes.get('/bookings', async (req, res) => {

  const prismaRepository = new PrismaBookingsRepository();

  const getAllBookingsUseCase = new GetAllBookingsUseCase(prismaRepository);

  var result = await getAllBookingsUseCase.execute();

  return res.status(200).send(result);
});