import express from 'express';

import { PrismaEmployeesRepository } from './repositories/prisma/prisma-employees-repository';
import { PrismaBookingsRepository } from './repositories/prisma/prisma-bookings-repository';
import { PrismaGuestsRepository } from './repositories/prisma/prisma-guests-repository';

import { CreateBookingUseCase } from './use-cases/booking/create-booking-use-case';
import { GetAllBookingsUseCase } from './use-cases/booking/get-all-bookings-use-case';
import { UpdateBookingUseCase } from './use-cases/booking/update-booking-use-case';

import { CreateEmployeeUseCase } from './use-cases/employee/create-employee-use-case';
import { LoginEmployeeUseCase } from './use-cases/employee/login-employee-use-case';
import { GetAllEmployeesUseCase } from './use-cases/employee/get-all-employees-use-case';

import { CreateGuestUseCase } from './use-cases/guest/create-guest-use-case';
import { GetAllGuestsUseCase } from './use-cases/guest/get-all-guests-use-case';
import { UpdateGuestUseCase } from './use-cases/guest/update-guest-use-case';

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
  const { guestId, room, reservationDate, entryDate, departureDate, status } = req.body;

  const prismaRepository = new PrismaBookingsRepository();
  const createBookingUseCase = new CreateBookingUseCase(prismaRepository);

  var id = await createBookingUseCase.execute({
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status
  });

  return res.status(201).send(id);
});

routes.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { guestId, room, reservationDate, entryDate, departureDate, status } = req.body;

  const prismaRepository = new PrismaBookingsRepository();
  const updateBookingUseCase = new UpdateBookingUseCase(prismaRepository);

  var result = await updateBookingUseCase.execute({
    id,
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status
  });

  return res.status(200).send(result);
});

routes.get('/bookings', async (req, res) => {

  const prismaRepository = new PrismaBookingsRepository();

  const getAllBookingsUseCase = new GetAllBookingsUseCase(prismaRepository);

  var result = await getAllBookingsUseCase.execute();

  return res.status(200).send(result);
});

routes.post('/guests', async (req, res) => {

  const { name, phone, email, document } = req.body;

  const prismaRepository = new PrismaGuestsRepository();

  const createGuestUseCase = new CreateGuestUseCase(prismaRepository);

  var id = await createGuestUseCase.execute({ name, phone, email, document });

  return res.status(201).send({ id });
});

routes.put('/guests/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, document } = req.body;

  const prismaRepository = new PrismaGuestsRepository();

  const updateGuestUseCase = new UpdateGuestUseCase(prismaRepository);

  var result = await updateGuestUseCase.execute({ id, name, phone, email, document });

  return res.status(200).send(result);
});

routes.get('/guests', async (req, res) => {

  const prismaRepository = new PrismaGuestsRepository();

  const getAllGuestsUseCase = new GetAllGuestsUseCase(prismaRepository);

  var result = await getAllGuestsUseCase.execute();

  return res.status(200).send(result);
});