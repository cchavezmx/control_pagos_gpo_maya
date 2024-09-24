import { config } from "./config";
import { jwtDecode } from "jwt-decode";

interface LoginData {
  email: string;
  password: string;
}

const login = async (data: LoginData) => {
  const response = await fetch(config.apiUrl + "/v1/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));

  if (response) {
    localStorage.setItem("tokenUserSite", response.login.token);
    window.location.href = "/";
  }
  return response;
};

const auth = async () => {
  const token = localStorage.getItem("tokenUserSite");
  // @ts-expect-error next line
  const auth = await fetch(config.apiUrl + `/v1/user/${jwtDecode(token).id}`, {
    method: "get",
    headers: new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));

  if (auth.message === "authentication error") {
    throw new Error("Credenciales no validas");
  }

  return auth;
};

const logout = () => {
  localStorage.removeItem("tokenUserSite");
  window.location.href = "/login";
}

export { login, auth, logout };
