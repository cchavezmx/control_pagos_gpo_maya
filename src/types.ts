import { OptionsOrGroups, GroupBase } from 'react-select';

interface DataItem {
  _id: string;
  title: string;
  isActive: boolean;
  updatedAt: string;
  activos: Activo[];
}

interface ClienteData {
  _id: string;
  address: string;
  email: string;
  nombre: string;
  phone: string;
  updated: string;
}

interface Activo {
  clienteData: ClienteData;
}

interface DashboardDataComponent {
  data: DataItem[] | undefined;
  razon: string | undefined;
}

interface ICliente {
  _id: string;
  nombre: string;
  email: string;
  phone: string;
  address: string;
  updated: string;
}

interface IProyecto {
  _id: string;
  title: string;
  isActive: boolean;
}

interface ILotesRow {
  _id: string;
  id: string;
  isActive: boolean;
  proyecto: IProyecto;
  cliente: ICliente;
  lote: string;
  manzana: string;
  precioTotal: number;
  enganche: number;
  financiamiento: number;
  plazo: number;
  mensualidad: number;
  inicioContrato: string;
  clienteData: ClienteData[];
}

interface ILote {
  _id: string;
  isActive: boolean;
  proyecto: IProyecto;
  cliente: ICliente;
  lote: string;
  manzana: string;
  precioTotal: number;
  enganche: number;
  financiamiento: number;
  plazo: number;
  mensualidad: number;
  inicioContrato: string;
  id: string;
  idCliente: string;
  idProyecto: string;
}

interface IPagos {
  _id: string;
  isActive: boolean;
  status: boolean;
  cliente: ICliente;
  proyecto: IProyecto[];
  lote: ILote;
  mes: string;
  refPago: string;
  mensualidad: number;
  tipoPago: string;
  folio: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ReactSelectCallback {
  (options: (options: OptionsOrGroups<string, GroupBase<string>>) => void | Promise<OptionsOrGroups<string, GroupBase<string>>>): void | Promise<OptionsOrGroups<string, GroupBase<string>>>;
}


interface INewClient {  
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;  
  phone: string;
  email: string;
  address: string;
}

interface INewClientPost extends INewClient {
  nombre: string;
  phone: string;
  email: string;
  address: string;
}

interface IStore {
  nombre: string;
  projectId: string
  lote: string;
  manzana: string;
}

interface IClientSearch {
  nombre: string | undefined | null;
  projectId: string | undefined | null;
  lote: string | undefined | null;
  manzana: string | undefined | null;
}

interface ICreateNewLote extends ILotesRow, Omit< "_id", | "id" > {  
}

export type {
  DataItem,
  DashboardDataComponent,
  ILotesRow,
  ILote,
  IProyecto,
  ICliente,
  IPagos,
  ClienteData,
  GroupBase,
  ReactSelectCallback,
  INewClient,
  IStore,
  IClientSearch,
  INewClientPost,
  ICreateNewLote
};
