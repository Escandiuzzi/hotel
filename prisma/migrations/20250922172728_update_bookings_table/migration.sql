CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    document TEXT NOT NULL UNIQUE
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_date TIMESTAMP,
    entry_date TIMESTAMP NOT NULL,
    departure_date TIMESTAMP NOT NULL,
    status TEXT NOT NULL,
    room TEXT,
    guest_id UUID NOT NULL,
    CONSTRAINT bookings_guest_id_fkey
        FOREIGN KEY (guest_id)
        REFERENCES guests (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);