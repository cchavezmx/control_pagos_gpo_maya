import { config } from "./config";
import { INewClientPost, ICreateNewLote } from "../types";

export function createProject({
  payload,
}: {
  payload: { title: string; address: string };
}) {
  const request = fetch(`${config.apiUrl}/v1/add/proyecto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return request;
}

export function getClientData(query: string) {
  const request = fetch(`${config.apiUrl}/v2/client/search?query=${query}`);
  return request;
}

export function getClient({ id }: { id: string }) {
  const request = fetch(`${config.apiUrl}/v2/lotesbyclient/${id}`);
  return request;
}

export function createCLient(payload: INewClientPost) {
  const url = `${config.apiUrl}/v1/add/cliente`;
  const res = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error);

  return res;
}
// para buscar si ya existe el cliente
export function newClientSearch(clientName: string) {
  const url = `${config.apiUrl}/v2/newClientSearch?clientName=${clientName}`;
  const request = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.message.filtered);

  return request;
}

export function addLoteToUser (idProyecto: string, payload: ICreateNewLote) {
  
  const url = `${config.apiUrl}/v1/add/lote/user/${idProyecto}/`;
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      return res
    })
    .catch(error => error)
  
  return response
}


/// GETS
export const getAllProyects = "/v1/proyectos" as const;