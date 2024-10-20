import { config } from "./config";
import { INewClientPost, ICreateNewLote } from "../types";

const fetcherV2 = async (url: string, params = {}) => {
  const token = localStorage.getItem("tokenUserSite");
  return fetch(config.apiUrl + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...params,
  });
};

export function createProject({
  payload,
}: {
  payload: { title: string; address: string };
}) {
  const request = fetcherV2("/v1/add/proyecto", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return request;
}

export function getClientData(query: string) {
  const request = fetcherV2(`/v2/client/search?query=${query}`);
  return request;
}

export function getClient({ id }: { id: string }) {
  const request = fetcherV2(`/v2/client/${id}`);
  return request;
}

export function createCLient(payload: INewClientPost) {
  const res = fetcherV2("/v1/add/cliente", {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error);

  return res;
}
// para buscar si ya existe el cliente
export function newClientSearch(clientName: string) {
  const request = fetcherV2(`/v2/client/search?query=${clientName}`)
    .then((res) => res.json())
    .then((res) => res.message.filtered);

  return request;
}

export function addLoteToUser(idProyecto: string, payload: ICreateNewLote) {
  const response = fetcherV2(`/v1/add/lote/user/${idProyecto}`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log({ res });
      return res;
    })
    .catch((error) => error);

  return response;
}

/// GETS
export const getAllProyects = "/v1/proyectos" as const;
