import express from "express";

import { PrismaEmployeesRepository } from "./repositories/prisma/prisma-employees-repository";
import { PrismaBookingsRepository } from "./repositories/prisma/prisma-bookings-repository";
import { PrismaGuestsRepository } from "./repositories/prisma/prisma-guests-repository";

import { CreateBookingUseCase } from "./use-cases/booking/create-booking-use-case";
import { GetAllBookingsUseCase } from "./use-cases/booking/get-all-bookings-use-case";
import { UpdateBookingUseCase } from "./use-cases/booking/update-booking-use-case";

import { CreateEmployeeUseCase } from "./use-cases/employee/create-employee-use-case";
import { LoginEmployeeUseCase } from "./use-cases/employee/login-employee-use-case";
import { GetAllEmployeesUseCase } from "./use-cases/employee/get-all-employees-use-case";

import { CreateGuestUseCase } from "./use-cases/guest/create-guest-use-case";
import { GetAllGuestsUseCase } from "./use-cases/guest/get-all-guests-use-case";
import { UpdateGuestUseCase } from "./use-cases/guest/update-guest-use-case";
import { PrismaServicesRepository } from "./repositories/prisma/prisma-service-repository";
import { CreateServiceUseCase } from "./use-cases/service/create-service-use-case";
import { DeleteServiceUseCase } from "./use-cases/service/delete-service-use-case";
import { GetAllServicesUseCase } from "./use-cases/service/get-all-services-use-case";
import { GetGuestByCpfUseCase } from "./use-cases/guest/get-guest-by-cpf-use-case";

export const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("🏨 Hotel API - Online");
});

routes.post("/employees", async (req, res) => {
  const { name, login, password } = req.body;

  const prismaRepository = new PrismaEmployeesRepository();
  const createEmployeeUseCase = new CreateEmployeeUseCase(prismaRepository);

  await createEmployeeUseCase.execute({ name, login, password });

  return res.status(201).send({ message: "Funcionário cadastrado com sucesso." });
});

routes.post("/employees/login", async (req, res) => {
  const { login, password } = req.body;

  const prismaRepository = new PrismaEmployeesRepository();
  const loginEmployeeUseCase = new LoginEmployeeUseCase(prismaRepository);

  const result = await loginEmployeeUseCase.execute({ login, password });

  return res.status(200).send(result);
});

routes.get("/employees", async (_, res) => {
  const prismaRepository = new PrismaEmployeesRepository();
  const getAllEmployeesUseCase = new GetAllEmployeesUseCase(prismaRepository);

  const result = await getAllEmployeesUseCase.execute();

  return res.status(200).send(result);
});

routes.post("/bookings", async (req, res) => {
  const {
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status,
    serviceIds,
  } = req.body;

  const prismaRepository = new PrismaBookingsRepository();
  const createBookingUseCase = new CreateBookingUseCase(prismaRepository);

  const id = await createBookingUseCase.execute({
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status,
    serviceIds,
  });

  return res.status(201).send({ id });
});

routes.put("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const {
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status,
    serviceIds,
  } = req.body;

  const prismaRepository = new PrismaBookingsRepository();
  const updateBookingUseCase = new UpdateBookingUseCase(prismaRepository);

  const result = await updateBookingUseCase.execute({
    id,
    guestId,
    room,
    reservationDate,
    entryDate,
    departureDate,
    status,
    serviceIds,
  });

  return res.status(200).send(result);
});

routes.get("/bookings", async (_, res) => {
  const prismaRepository = new PrismaBookingsRepository();
  const getAllBookingsUseCase = new GetAllBookingsUseCase(prismaRepository);

  const result = await getAllBookingsUseCase.execute();

  return res.status(200).send(result);
});

routes.post("/guests", async (req, res) => {
  const { name, phone, email, document, age } = req.body;

  const prismaRepository = new PrismaGuestsRepository();
  const createGuestUseCase = new CreateGuestUseCase(prismaRepository);

  const id = await createGuestUseCase.execute({
    name,
    phone,
    email,
    document,
    age,
  });

  return res.status(201).send({ id });
});

routes.put("/guests/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, document, age } = req.body;

  const prismaRepository = new PrismaGuestsRepository();
  const updateGuestUseCase = new UpdateGuestUseCase(prismaRepository);

  const result = await updateGuestUseCase.execute({
    id,
    name,
    phone,
    email,
    document,
    age,
  });

  return res.status(200).send(result);
});

routes.get("/guests", async (_, res) => {
  const prismaRepository = new PrismaGuestsRepository();
  const getAllGuestsUseCase = new GetAllGuestsUseCase(prismaRepository);

  const result = await getAllGuestsUseCase.execute();

  return res.status(200).send(result);
});

routes.post("/services", async (req, res) => {
  const { name, description, price } = req.body;

  const prismaRepository = new PrismaServicesRepository();
  const createServiceUseCase = new CreateServiceUseCase(prismaRepository);

  const id = await createServiceUseCase.execute({ name, description, price });

  return res.status(201).send({ id });
});

routes.delete("/services/:id", async (req, res) => {
  const { id } = req.params;

  const prismaRepository = new PrismaServicesRepository();
  const deleteServiceUseCase = new DeleteServiceUseCase(prismaRepository);

  const result = deleteServiceUseCase.execute(id)
  return res.status(200).send(result);
});

routes.get("/services", async (_, res) => {
  const prismaRepository = new PrismaServicesRepository();
  const getAllServicesUseCase = new GetAllServicesUseCase(prismaRepository);

  const result = await getAllServicesUseCase.execute();

  return res.status(200).send(result);
});

routes.get("/guests/cpf/:cpf", async (req, res) => {
  const { cpf } = req.params;

  const prismaRepository = new PrismaGuestsRepository();
  const getGuestByCpfUseCase = new GetGuestByCpfUseCase(prismaRepository);

  const result = await getGuestByCpfUseCase.execute({ cpf });

  if (!result) {
    return res.status(404).send({ message: "Guest not found" });
  }

  return res.status(200).send(result);
});