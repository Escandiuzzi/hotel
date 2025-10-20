export interface ServiceCreateData {
  name: string;
  description: string;
  price: number;
}

export interface ServiceData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isActive: boolean;
}

export interface ServicesRepository {
  create: (data: ServiceCreateData) => Promise<string>;
  update: (
    id: string,
    data: Partial<ServiceCreateData & { isActive: boolean }>
  ) => Promise<ServiceData | null>;
  getAll: () => Promise<ServiceData[]>;
  getById: (id: string) => Promise<ServiceData | null>;
}