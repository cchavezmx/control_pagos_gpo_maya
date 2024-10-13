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

interface PagosExtra {
  _id: string;
  id_pago_: string;
  tipo: string;
  extraSlug: string;
  mensualidad: number;
}

interface ClienteData {
  _id: string;
  nombre: string;
  email: string;
  phone: string;
  address: string;
}

interface ProyectoData {
  _id: string;
  title: string;
  isActive: boolean;
  updatedAt: string;
}

interface LoteData {
  _id: string;
  lote: string;
  manzana: string;
  precioTotal: number;
  enganche: number;
  financiamiento: number;
  plazo: number;
  mensualidad: number;
  inicioContrato: string;
  isActive: boolean;
}

interface PagosRecordsDataRow {
  id: string; // Lote ID
  cliente: string; // Cliente ID
  totalMensualidad: number;
  pagosExtra: PagosExtra[]; // Array de pagos extra
  pagosMoratorios: number;
  numeroDePagos: number;
  cliente_data: ClienteData; // Datos del cliente
  proyecto_data: ProyectoData; // Datos del proyecto
  lote_data: LoteData; // Datos del lote
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
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
  ICreateNewLote,
  PagosExtra,
  PagosRecordsDataRow,
};
