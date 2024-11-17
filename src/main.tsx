import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import fetcher from "./services/fetcher";
import ContextGlobalProvider from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";
import Wrapper from "./components/Wrapper.tsx";
import DashboardHOC from "./view/Dashboard/index.tsx";
import Project from "./view/ProjectoDetalle/Project.tsx";
import Pagos from "./view/PagosView/Pagos.tsx";
import Clientes from "./view/Clientes/index.tsx";
import Morosos from "./view/Morosos/index.tsx";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./view/Login/index.tsx";
import "./index.css";
import PagosRecors from "./view/PagosRecords/index.tsx";
import PaymentsDetails from "./view/PaymenstDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
        <Stack width="100vw">,
          <Login />
        </Stack>
    ),
  },
  {
    path: "/",
    element: (
      <Wrapper>
        <DashboardHOC />
      </Wrapper>
    ),
  },
  {
    path: "/proyecto/:id/:title",
    element: (
      <Wrapper>
        <Project />
      </Wrapper>
    ),
  },
  {
    path: "/pagos/proyecto/:idPoject/cliente/:idClient",
    element: (
      <Wrapper>
        <Pagos />
      </Wrapper>
    ),
  },
  {
    path: "/search/clientes",
    element: (
      <Wrapper>
        <Clientes />
      </Wrapper>
    ),
  },
  {
    path: "/morosos",
    element: (
      <Wrapper>
        <Morosos />
      </Wrapper>
    ),
  },
  {
    path: "pagos-record",
    element: (
      <Wrapper>
        <PagosRecors />
      </Wrapper>
    ),
  },
  {
    path: "payments-details/:id/:title",
    element: (
      <Wrapper>
        <PaymentsDetails />
      </Wrapper>
    ),
  }
]);

const theme = createTheme({
  palette: {
    secondary: {
      main: "#616161",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiFilledInput-root": {
            background: "rgb(232, 241, 250)",
            // Añadir estilo para el estado enfocado
            "&.Mui-focused": {
              background: "#D6E4FF", // Cambia este valor al color deseado
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <ContextGlobalProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ContextGlobalProvider>
      </SWRConfig>
    </ThemeProvider>
  </React.StrictMode>,
);
