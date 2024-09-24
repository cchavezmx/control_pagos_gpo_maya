import useSWR from "swr";
import { Stack, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { drawerWidth } from "../Layout";
import dayjs from "dayjs";

interface Item {
  _id: string;
  cliente_data: [{ nombre: string }];
  proyecto_data: [{ title: string }];
  lote_data: { lote: string; inicioContrato: string };
  folio: string;
  fechaPago: string;
  diasAtraso: string;
  mes: string;
  proyecto: [string];
  cliente: [string];
  link: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeRows = (data: any, navigate: any) => {
  if (data.length === 0) return [];
  const threeDays = data.treinta_dias;
  const sixDays = data.sesenta_dias;

  const map30 = threeDays.map((item: Item) => {
    return {
      id: item._id,
      clienteNombre: item.cliente_data[0].nombre,
      proyectoTitle: item.proyecto_data[0].title,
      lote: item.lote_data.lote,
      lastFolio: item.folio,
      contractDay: dayjs(item.lote_data.inicioContrato).format("DD/MM/YYYY"),
      lastPyamentDate: dayjs(item.mes).format("DD/MM/YYYY"),
      link: () =>
        navigate(
          `/pagos/proyecto/${item.proyecto[0]}/cliente/${item.cliente[0]}`,
        ),
      diasAtraso: "30 días",
    };
  });

  const map60 = sixDays.map((item: Item) => {
    return {
      id: item._id,
      clienteNombre: item.cliente_data[0].nombre,
      proyectoTitle: item.proyecto_data[0].title,
      lote: item.lote_data.lote,
      lastFolio: item.folio,
      contractDay: dayjs(item.lote_data.inicioContrato).format("DD/MM/YYYY"),
      lastPyamentDate: dayjs(item.mes).format("DD/MM/YYYY"),
      diasAtraso: "60 días",
      link: () =>
        navigate(
          `/pagos/proyecto/${item.proyecto[0]}/cliente/${item.cliente[0]}`,
        ),
    };
  });

  return map30.concat(map60);
};

const columns: GridColDef<(typeof makeRows)[]>[] = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "clienteNombre", headerName: "Cliente", width: 250 },
  { field: "proyectoTitle", headerName: "Proyecto", width: 100 },
  { field: "lote", headerName: "Lote", width: 100 },
  { field: "lastFolio", headerName: "Folio", width: 150 },
  { field: "contractDay", headerName: "Inicios Contrato", width: 150 },
  { field: "lastPyamentDate", headerName: "Último Pago", width: 150 },
  { field: "diasAtraso", headerName: "Atraso", width: 100 },
  {
    field: "Acciones",
    headerName: "",
    width: 120,
    renderCell: (props) => {
      return (
        // @ts-expect-error next line
        <Button variant="contained" onClick={() => props.row.link()}>
          IR
        </Button>
      );
    },
  },
];

function MorososView() {
  const { data: morosos, isLoading } = useSWR("/v1/morosos");
  console.log(morosos, isLoading, "IS LOADING");
  const navigate = useNavigate();
  return (
    <Stack minHeight={70} width={`calc(100vw - ${drawerWidth}px)`} paddingX={2}>
      <h1>Lista de Morosos</h1>
      <Box
        sx={{
          height: "70vh",
          width: "100%",
          "& .super-app-theme--Rejected": {
            bgcolor: "#bdc3c7",
            color: "#34495e",
            "&:hover": {
              bgcolor: "#bdc3c7",
            },
          },
        }}
      >
        {" "}
        <DataGrid
          rows={makeRows(morosos || [], navigate)}
          columns={columns}
          disableRowSelectionOnClick
          checkboxSelection={false}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Stack>
  );
}

export default MorososView;
