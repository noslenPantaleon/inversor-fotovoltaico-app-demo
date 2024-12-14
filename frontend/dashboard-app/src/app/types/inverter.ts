export type Root = clients[];

export interface clients {
  id: number;
  name: string;
  createdAt: string;
  inverters: Inverter[];
}

export interface Inverter {
  id: number;
  name: string;
  temperature: number;
  voltage: number;
  current: number;
  createdAt: Date;
  connectionId: number;
}

export type inverters = Inverter[];
