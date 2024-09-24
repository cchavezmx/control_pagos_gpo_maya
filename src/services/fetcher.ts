import { config } from "./config";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("tokenUserSite");
  return fetch(config.apiUrl + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.message === "authentication error") {
        window.location.href = "/login";
        throw new Error("Credenciales no validas");
      }
      return data.message;
    })
    .catch((error) => {
      return error;
    });
};

export default fetcher;
