import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ILotesRow } from "../../types";
import { currencyValueGetter } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Acciones(row: { row: any }) {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => navigate(`/pagos/proyecto/${row.row.idproyecto}/cliente/${row.row.idcliente}`)}
      >
        Ver
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => console.log(row.row)}
      >
        Editar
      </Button>
    </Stack>
  );
}

const columns: GridColDef<(typeof makeRows)[]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "lote", headerName: "Lote", width: 90, align: "center" },
  { field: "manzana", headerName: "Manzana", width: 80, align: "center" },
  {
    field: "precioTotal",
    headerName: "Precio Total",
    type: "number",
    width: 180,
    valueGetter: currencyValueGetter,
    align: "center",
    headerAlign: "center",
  },
  { field: "enganche", headerName: "Enganche", type: "number", width: 150 },
  {
    field: "financiamiento",
    headerName: "Financiamiento",
    type: "number",
    width: 150,
  },
  { field: "plazo", headerName: "Plazo", type: "number", width: 150 },
  {
    field: "mensualidad",
    headerName: "Mensualidad",
    type: "number",
    width: 150,
  },
  { field: "inicioContrato", headerName: "Inicio Contrato", width: 150 },
  { field: "cliente", headerName: "Cliente", width: 350 },
  {
    field: "Acciones",
    headerName: "Acciones",
    width: 250,
    headerAlign: "center",
    renderCell: Acciones,
    align: "center",
  },
];

const makeRows = (data: ILotesRow[]) => {
  if (!data) return [];
  return data.map((r: ILotesRow) => {
    console;
    return {
      ...r,
      id: r._id,
      cliente: r.cliente.nombre,
      proyecto: r.proyecto.title,
      idproyecto: r.proyecto._id,
      idcliente: r.cliente._id,
    };
  });
};

export default function TableLotesView(props: { data: ILotesRow[] }) {
  const { data } = props;
  const rows = makeRows(data);

  return (
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
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
              enganche: false,
              financiamiento: false,
              plazo: false,
              mensualidad: false,
              inicioContrato: false,
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows={rows as any}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={false}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
